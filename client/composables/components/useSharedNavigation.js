import opnformConfig from "~/opnform.config.js"

export const useSharedNavigation = () => {
  const appStore = useAppStore()
  const crisp = useCrisp()
  const changelogRequested = useState('featurebase-changelog-requested', () => false)
  
  const isSelfHosted = computed(() => useFeatureFlag('self_hosted'))
  const featurebaseLoaded = computed(() => {
    return import.meta.client && window.Featurebase
  })

  // Check for new changes in changelog
  const hasNewChanges = computed(() => {
    if (import.meta.server || !window.Featurebase || !appStore.featureBaseEnabled) return false
    return window.Featurebase("unviewed_changelog_count") > 0
  })

  // Open changelog modal
  function openChangelog() {
    if (import.meta.server) return
    changelogRequested.value = true
  }

  // Default button configuration
  const defaultButtonProps = {
    variant: 'ghost',
    activeVariant: 'soft', 
    color: 'neutral',
    block: true,
  }

  // Helper function to apply defaults to navigation items
  const createNavItem = (item) => {
    const baseItem = {
      ...defaultButtonProps,
      ...item
    }
    
    const customClasses = ['group']
    
    // For ghost variant (default), darken hover state
    if (baseItem.variant === 'ghost' && baseItem.color === 'neutral') {
      customClasses.push('hover:bg-neutral-100 dark:hover:bg-neutral-800')
      baseItem.ui = {
        ...baseItem.ui,
        leadingIcon: 'text-(--opn-muted)'
      }
    }
    
    if (baseItem.active && baseItem.activeVariant === 'soft' && baseItem.color === 'neutral') {
      customClasses.push('bg-neutral-100 text-(--opn-ink) dark:bg-neutral-800')
    }
    
    if (baseItem.color === 'primary') {
      if (baseItem.variant === 'ghost') {
        customClasses.push('hover:bg-neutral-100 dark:hover:bg-neutral-800')
      }
      if (baseItem.active && baseItem.activeVariant === 'soft') {
        customClasses.push('data-[active=true]:bg-neutral-100 dark:data-[active=true]:bg-neutral-800')
      }
    }
    
    return {
      ...baseItem,
      class: customClasses.length > 0 ? customClasses.join(' ') : undefined
    }
  }

  // Shared navigation sections (Product and Help)
  const sharedNavigationSections = computed(() => [
    // Product section
    {
      name: 'Product',
      items: [
        // What's new - only show if feature base enabled
        ...(appStore.featureBaseEnabled ? [createNavItem({
          label: "What's new",
          icon: 'i-heroicons-megaphone',
          color: hasNewChanges.value ? 'primary' : 'neutral',
          trailingIcon: hasNewChanges.value ? 'i-heroicons-sparkles-solid' : undefined,
          ui: {
            trailingIcon: 'text-blue-500'
          },
          onClick: openChangelog
        })] : []),
        createNavItem({
          label: 'Roadmap',
          icon: 'i-heroicons-map',
          to: opnformConfig.links.roadmap,
          target: '_blank'
        }),
        (featurebaseLoaded.value ? createNavItem({
          label: 'Feature Requests',
          icon: 'i-heroicons-light-bulb', 
          onClick: () => {
            window.postMessage({
                target: 'FeaturebaseWidget',
                data: { 
                  action: 'openFeedbackWidget',
                  setBoard: 'feature-requests', // optional - preselect a board
                }
            })
          }
        }):  createNavItem({
          label: 'Feature Requests',
          icon: 'i-heroicons-light-bulb', 
          to: opnformConfig.links.feature_requests,
          target: '_blank'
        }))
      ]
    },
    // Help section
    {
      name: 'Help',
      items: [
        createNavItem({
          label: 'Help Center',
          icon: 'i-heroicons-question-mark-circle',
          to: opnformConfig.links.help_url,
          target: '_blank'
        }),
        createNavItem({
          label: 'API Docs',
          icon: 'i-heroicons-code-bracket',
          to: opnformConfig.links.api_docs,
          target: '_blank'
        }),
        ...(isSelfHosted.value || !crisp ? [] : [createNavItem({
          label: 'Contact Support',
          icon: 'i-heroicons-chat-bubble-left-right',
          onClick: () => crisp.openChat()
        })])
      ]
    }
  ])

  return {
    sharedNavigationSections,
    createNavItem,
    defaultButtonProps
  }
}
