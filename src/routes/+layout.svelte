<script>
    import Home from "svelte-material-icons/Home.svelte";
    import Cog from "svelte-material-icons/Cog.svelte";
    import NewsPaperVariant from "svelte-material-icons/NewspaperVariant.svelte";
    import {page} from "$app/stores";
</script>

<main>
    <div id="content">
        <slot></slot>
    </div>
</main>

<nav>
    <a href="/" class:active={$page.url.pathname === "/"}>
        <Home width="24" height="24"/>
        Home
    </a>
    <a href="/projects/" class:active={$page.url.pathname.startsWith("/projects/")}>
        <Cog width="24" height="24"/>
        Projects
    </a>
    <a href="/blog/" class:active={$page.url.pathname.startsWith("/blog/")}>
        <NewsPaperVariant width="24" height="24"/>
        Blog
    </a>
</nav>

<style>
    main {
        top: 0;
        left: 0;
        right: 0;
        bottom: 4rem;
        padding: 5vh 10vw;
    }


    #content {
        overflow-y: auto;
        overflow-x: hidden;

        min-height: 100%;
        height: 100%;
        max-height: 100%;

        padding: 0.6rem;
    }

    #content:last-child {
        margin-bottom: 4rem;
    }

    nav {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        min-height: 10vh;

        display: flex;
        justify-content: space-around;
        align-items: stretch;

        backdrop-filter: blur(150px) brightness(.8);
        -webkit-backdrop-filter: blur(150px);
        box-shadow: 0 -5px 15px rgba(0, 0, 0, .2);

        mask-image: linear-gradient(0deg, black 50%, transparent 100%);
        -webkit-mask-image: linear-gradient(0deg, black 50%, transparent 100%);
    }

    nav > a {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        text-align: center;
        padding: 1rem;
        flex: 1;
        color: var(--text-main);
        text-transform: uppercase;

        transition: all 300ms ease-out;
    }

    nav > a:not(.active):hover {
        color: var(--link-col);
        backdrop-filter: brightness(0);
        -webkit-backdrop-filter: brightness(0);
        background-color: rgba(255, 255, 255, .1);
    }

    nav > a.active {
        color: var(--accent-col);
        cursor: default;
        filter: brightness(.7);
        background-color: rgba(255, 255, 255, .1);
    }
</style>