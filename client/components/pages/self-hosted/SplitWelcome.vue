<template>
  <main class="split-welcome opn-chrome">
    <section class="instance" aria-labelledby="access-title">
      <div class="instance-access">
        <div class="instance-address">
          <span class="instance-symbol"><img v-if="logoUrl !== '/img/logo.svg'" :src="logoUrl" alt="" /><UIcon v-else name="i-heroicons-server-stack" /></span>
          <span class="instance-identity"><span v-if="name !== 'OpnForm'" class="instance-name">{{ name }}</span><span>{{ instanceHost }}</span></span>
        </div>
        <h1 id="access-title">Your team’s form workspace.</h1>
        <p class="instance-description">Sign in to create forms and manage responses on this instance.</p>
        <UButton :to="{ name: 'login' }" trailing-icon="i-heroicons-arrow-right" size="xl" label="Sign in" class="instance-sign-in" />
        <NuxtLink :to="{ name: 'templates' }" class="instance-templates">Browse templates</NuxtLink>
        <p class="instance-note"><UIcon name="i-heroicons-information-circle" /><span>Looking for a form? Use the link shared with you.</span></p>
      </div>
      <footer class="instance-footer">
        <p>Hosted independently · Powered by <a :href="cloudUrl" target="_blank" rel="noopener noreferrer">OpnForm</a></p>
        <div v-if="privacyPolicyUrl || termsUrl" class="instance-legal">
          <a v-if="privacyPolicyUrl" :href="privacyPolicyUrl">Privacy policy</a>
          <a v-if="termsUrl" :href="termsUrl">Terms</a>
        </div>
      </footer>
    </section>

    <section class="studio" aria-labelledby="studio-title">
      <a :href="cloudUrl" target="_blank" rel="noopener noreferrer" class="studio-brand">
        <img src="/img/logo.svg" alt="" />
        <span>OpnForm</span>
      </a>
      <div class="studio-copy">
        <h2 id="studio-title">Your forms, your way.</h2>
        <p>The open-source form builder.</p>
      </div>
      <div class="studio-scene" aria-hidden="true">
        <div class="studio-cluster">
          <img
            src="/img/self-hosted/feedback-card.webp"
            srcset="/img/self-hosted/feedback-card-640.webp 640w, /img/self-hosted/feedback-card.webp 950w"
            sizes="(max-width: 600px) 62vw, (max-width: 960px) 350px, 28vw"
            width="950"
            height="1253"
            alt=""
            class="studio-card feedback-card"
            decoding="async"
          />
          <img
            src="/img/self-hosted/project-card.webp"
            srcset="/img/self-hosted/project-card-640.webp 640w, /img/self-hosted/project-card.webp 948w"
            sizes="(max-width: 600px) 74vw, (max-width: 960px) 420px, 34vw"
            width="948"
            height="1173"
            alt=""
            class="studio-card project-card"
            decoding="async"
            fetchpriority="high"
          />
        </div>
      </div>
      <div class="studio-bottom">
        <a :href="cloudUrl" target="_blank" rel="noopener noreferrer" class="studio-discover">
          Build your own forms with OpnForm <UIcon name="i-heroicons-arrow-up-right" />
        </a>
      </div>
    </section>
  </main>
</template>

<script setup>
const instanceHost = useRequestURL().host
const { name, logoUrl, privacyPolicyUrl, termsUrl } = useSelfHostedPresentation()
const cloudUrl = 'https://opnform.com?utm_source=self_hosted&utm_medium=instance&utm_campaign=welcome_split'
</script>

<style scoped>
.split-welcome {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  min-height: 100svh;
  background: var(--opn-surface);
  color: var(--opn-ink);
}

.studio {
  grid-area: 1 / 1;
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  min-width: 0;
  padding: clamp(28px, 5svh, 56px) clamp(28px, 5vw, 92px);
  background: var(--opn-paper);
  border-inline-end: 1px solid var(--opn-line);
}

.studio-brand,
.studio-discover {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 10px;
  color: var(--opn-ink);
}

.studio-brand {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -.055em;
}

.studio-brand img {
  width: 28px;
  height: 28px;
  filter: brightness(0);
}

:global(.dark) .studio-brand img {
  filter: brightness(0) invert(1);
}

.studio-copy {
  margin-top: clamp(36px, 7vh, 86px);
}

.studio-copy h2,
.instance h1 {
  color: var(--opn-ink);
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -.055em;
  line-height: 1.02;
  text-wrap: balance;
}

.studio-copy h2 {
  max-width: 13ch;
  font-size: clamp(40px, 5.5vw, 82px);
}

.studio-copy p {
  margin-top: 12px;
  color: var(--opn-muted);
  font-size: clamp(16px, 1.6vw, 22px);
}

.studio-scene {
  position: relative;
  flex: 1;
  min-height: clamp(290px, 42vh, 540px);
  margin-block: 26px;
  overflow: hidden;
  border: 1px solid var(--opn-line);
  border-radius: 8px;
  background-color: var(--opn-surface);
  background-image:
    linear-gradient(to right, var(--opn-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--opn-line) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
}

.studio-cluster {
  position: absolute;
  inset: 4% 0;
  width: min(100%, 610px);
  margin-inline: auto;
}

.studio-card {
  position: absolute;
  width: auto;
  object-fit: contain;
  filter: grayscale(1);
}

.feedback-card {
  height: 76%;
  max-width: 62%;
  inset-inline-start: 9%;
  top: 13%;
  transform: rotate(-9deg);
}

.project-card {
  height: 90%;
  max-width: 68%;
  inset-inline-end: 7%;
  bottom: 3%;
  transform: rotate(7deg);
}

.studio-discover {
  padding-bottom: 5px;
  border-bottom: 1px solid var(--opn-line);
  font-size: 14px;
  font-weight: 500;
}

.studio-discover:hover {
  border-color: currentColor;
}

.studio-discover .iconify {
  flex-shrink: 0;
  width: 16px;
  height: 16px;
}

.instance {
  grid-area: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
  padding: clamp(32px, 6svh, 72px) clamp(28px, 5.5vw, 100px) 30px;
}

.instance-access {
  width: 100%;
  max-width: 420px;
  margin-block: auto;
}

.instance-address {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--opn-muted);
  font-size: 14px;
}

.instance-symbol {
  display: grid;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  place-items: center;
  border: 1px solid var(--opn-line);
  border-radius: 6px;
  background: var(--opn-paper);
  color: var(--opn-ink);
}

.instance-symbol .iconify,
.instance-symbol img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.instance-identity {
  display: grid;
  min-width: 0;
  gap: 2px;
  overflow-wrap: anywhere;
}

.instance-name {
  color: var(--opn-ink);
  font-weight: 600;
}

.instance h1 {
  max-width: 13ch;
  margin-top: 28px;
  font-size: clamp(36px, 4.4vw, 64px);
}

.instance-description {
  max-width: 28ch;
  margin-top: 16px;
  color: var(--opn-muted);
  font-size: 16px;
  line-height: 1.6;
}

.instance-sign-in {
  margin-top: 28px;
  min-width: 126px;
  justify-content: space-between;
}

.instance-templates {
  display: inline-flex;
  margin-inline-start: 16px;
  color: var(--opn-ink);
  font-size: 14px;
  text-underline-offset: 4px;
}

.instance-templates:hover,
.instance-footer a:hover {
  text-decoration: underline;
}

.instance-note {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid var(--opn-line);
  color: var(--opn-muted);
  font-size: 14px;
  line-height: 1.55;
}

.instance-note .iconify {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}

.instance-footer {
  width: 100%;
  max-width: 420px;
  padding-top: 36px;
  color: var(--opn-muted);
  font-size: 13px;
  line-height: 1.6;
}

.instance-footer a {
  color: var(--opn-ink);
}

.instance-legal {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 18px;
  margin-top: 6px;
}

a:focus-visible {
  outline: 2px solid var(--opn-ink);
  outline-offset: 4px;
}

@media (max-width: 860px) {
  .split-welcome {
    grid-template-columns: minmax(0, 1fr);
  }

  .instance {
    grid-area: 1 / 1;
    padding: 42px 24px 28px;
  }

  .studio {
    grid-area: 2 / 1;
    width: 100%;
    min-height: 0;
    padding: 28px 24px;
    border-inline-end: 0;
    border-top: 1px solid var(--opn-line);
  }

  .studio-copy {
    margin-top: 34px;
  }

  .studio-scene {
    flex: none;
    min-height: clamp(280px, 55vw, 460px);
  }
}
</style>
