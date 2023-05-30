<script lang='ts'>
  import { page } from '$app/stores';
	import { AppRail, AppRailAnchor, LightSwitch, SlideToggle } from '@skeletonlabs/skeleton';
  let navs = [['chatrooms','Chat!'],['login','Login!']];
</script>
  <!--
  <a href="/" style="margin-left: 0.5em">
    <img src="/icon.jpg" alt="icon" style="width:auto;height:auto;max-height:50%" />
    <span style="font-size:2em">¡KerPlunk!<span>
  </a>
  <div class="lightswitch"><LightSwitch /></div>
  <div class="menu">
    <div class="lightswitch">
      <LightSwitch />
    </div>
    {#each navs as n}
      <a href="/{n[0]}" id='{n[0]}-b' class="button">{n[1]}</a>
    {/each}
  </div>
  -->
  <AppRail>
    <svelte:fragment slot="lead">
      <AppRailAnchor href="/">
        <img src="/icon.jpg" alt="icon" style="width:auto;height:auto;max-height:50%" />
      </AppRailAnchor>
    </svelte:fragment>
    
    {#each navs as n}
      <AppRailAnchor href={n[0]} selected={$page.url.pathname === '/' + n[0]}>
        <svelte:fragment slot="lead">(ICON)</svelte:fragment>
        <span>{n[1]}</span>
      </AppRailAnchor>
    {/each}

    <div class="lightswitch">
      <LightSwitch />
    </div>
  </AppRail>
