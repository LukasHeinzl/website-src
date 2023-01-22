<script>
    import Twitter from "svelte-material-icons/Twitter.svelte";
    import Instagram from "svelte-material-icons/Instagram.svelte";
    import Github from "svelte-material-icons/Github.svelte";
    import Youtube from "svelte-material-icons/Youtube.svelte";
    import Linkedin from "svelte-material-icons/Linkedin.svelte";
</script>

<div class="landing-page">
    <img src="/Logo.png" alt="Logo"/>
    <h1>Lukas Heinzl</h1>
    <p>
        Hey there, I'm Lukas!<br/>
        I am a developer from Austria that currently studies Media technology with focus on interactive media
        (apps, websites, AR/VR, etc.).<br/>
        Below you can find a list of links to my profiles on various platforms.<br/>
        On this website you can explore <a href="/projects">projects</a> that I have been or currently am working
        on.<br/>
        You will also find my <a href="/blog">personal blog</a> where I write more about my day-to-day life as well as
        my long struggles
        with mental health.<br/>
        Have fun!
    </p>
    <div class="link-list">
        <a href="https://twitter.com/LukasHeinzl" target="_blank" rel="noreferrer">
            <Twitter/>
            Twitter
        </a>
        <a href="https://www.instagram.com/lukasheinzl/" target="_blank" rel="noreferrer">
            <Instagram/>
            Instagram
        </a>
        <a href="https://github.com/LukasHeinzl" target="_blank" rel="noreferrer">
            <Github/>
            Github
        </a>
        <a href="https://www.youtube.com/channel/UCZIL1AD1I0opSfmJZn3SJbA/" target="_blank" rel="noreferrer">
            <Youtube/>
            Youtube
        </a>
        <a href="https://www.linkedin.com/in/lukas-heinzl-120217202" target="_blank" rel="noreferrer">
            <Linkedin/>
            LinkedIn
        </a>
    </div>
</div>

<style>
    div.landing-page {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        text-align: center;
        height: 100%;
    }

    img {
        height: 10rem;
    }

    a {
        color: var(--link-col);
    }

    a:hover {
        color: var(--hover-col);
    }

    div.link-list {
        display: flex;
        gap: 1rem;
    }

    .link-list > a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        text-decoration: none;
    }
</style>