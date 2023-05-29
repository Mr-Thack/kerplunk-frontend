<script lang='ts'>
  import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { LightSwitch, SlideToggle } from '@skeletonlabs/skeleton';
  let navs = [['chatrooms','Chat!'],['login','Login!']];
</script>
<nav>
  <a href="/" style="margin-left:0.5em">
    <img src="/icon.jpg" alt="icon" style="width:auto;height:auto;max-height:50%" />
    <span style="font-size:2em">¡KerPlunk!<span>
  </a>
  <div class="lightswitch"><LightSwitch /></div>
  <div class="menu">
    {#each navs as n}
      <a href="/{n[0]}" id='{n[0]}-b' class="button">{n[1]}</a>
    {/each}
  </div>
</nav>
