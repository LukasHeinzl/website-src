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

<footer>
    <a href="/" class:active={$page.url.pathname === "/"}>
        <Home/>
        Home
    </a>
    <a href="/projects" class:active={$page.url.pathname === "/projects"}>
        <Cog/>
        Projects
    </a>
    <a href="/blog" class:active={$page.url.pathname === "/blog"}>
        <NewsPaperVariant/>
        Personal blog
    </a>
</footer>

<style>
    main {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 4rem;
        padding: 1.5rem;
    }

    #content {
        overflow-y: auto;
        overflow-x: hidden;

        min-height: 100%;
        height: 100%;
        max-height: 100%;

        padding: 0.6rem;
        border: 1px solid gray;
        border-radius: 0.7rem;
    }

    footer {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        height: 3rem;

        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    footer > a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        text-decoration: none;
        color: var(--link-col);
        padding: 0.5rem 0;
        flex: 1;
        border-right: 1px solid gray;
        border-top: 1px solid gray;
    }

    footer > a:last-of-type {
        border-right: none;
    }

    footer > a:hover {
        color: var(--hover-col);
        background: var(--link-col);
    }

    footer > a.active {
        color: var(--hover-col);
    }
</style>