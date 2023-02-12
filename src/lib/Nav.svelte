<script>
    import Home from "svelte-material-icons/Home.svelte";
    import NewsPaperVariant from "svelte-material-icons/NewspaperVariant.svelte";
    import MonitorCellphoneStar from 'svelte-material-icons/MonitorCellphoneStar.svelte';
    import {page} from "$app/stores";

    //  RegExp used to match the current url path. Not 100% accurate, but enough for now..
    const pathPattern = /^(?<root>\/)(?<base>\w+)?(?<tail>.*)?$/gi;

    //  Page names matching url path names, stripped by any leading slash and trailing path
    const pages = ['', 'projects', 'blog'];
    let pageIdx, navGradientPosition;
    let y = 0, h = 0, scroll, collapsed;
    const collapseThreshold = .2;

    $: scroll = y / h;
    $: collapsed = scroll > collapseThreshold;
    $: pageIdx = Math.max(0, pages.findIndex(p => p === $page.url.pathname.replace(pathPattern, '$<base>')));
    $: navGradientPosition = Math.trunc(100 * pageIdx / (pages.length - 1));
</script>

<svelte:window bind:scrollY={y} bind:innerHeight={h}/>

<nav style="--gradient-pos: {navGradientPosition}%" class:collapsed={collapsed}>
    <a href="/" class:active={pageIdx === 0} title="{collapsed ? 'Home' : ''}">
        <Home size="1.7em"/>
        <span class="nav-link-title">Home</span>
    </a>
    <a href="/projects/" class:active={pageIdx === 1} title="{collapsed ? 'Projects' : ''}">
        <MonitorCellphoneStar size="1.7em"/>
        <span class="nav-link-title">Projects</span>
    </a>
    <a href="/blog/" class:active={pageIdx === 2} title="{collapsed ? 'Blog' : ''}">
        <NewsPaperVariant size="1.7em"/>
        <span class="nav-link-title">Blog</span>
    </a>
</nav>

<style>
    nav {
        --gradient-pos: 0%;

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 9vh;
        display: flex;
        justify-content: center;
        align-items: stretch;
        background-color: var(--bg-main);

        transition: opacity 200ms ease-out, background 300ms linear;
    }


    nav.collapsed {
        --gradient-pos: 50% !important;
        opacity: .7;
        background: radial-gradient(ellipse at var(--gradient-pos) 100%, var(--bg-main) 0%, transparent 70%);
    }

    nav.collapsed .nav-link-title {
        display: none;
    }

    nav:hover, nav:hover .nav-link-title {
        opacity: 1;
    }

    nav > a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: .3rem;
        flex: 1;
        color: var(--text-main);
        text-transform: uppercase;
        border-bottom: 3px solid transparent;
        text-shadow: 2px 3px 15px black;

        transition: filter 200ms ease-out, border 300ms linear, flex 500ms ease-in-out;
    }

    nav > a:not(.active):hover {
        color: var(--link-col);
        filter: brightness(1.2);
        border-color: var(--link-col);
    }

    nav > a.active {
        color: var(--accent-col);
        cursor: default;
        filter: brightness(.9);
        border-color: var(--accent-col);
    }

    nav.collapsed > a {
        padding: 0 2rem 0 2rem;
        flex-grow: 0;
    }

    .nav-link-title {
        font-size: .8rem;
    }

</style>