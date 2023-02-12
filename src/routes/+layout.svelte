<script>
    import Nav from '$lib/Nav.svelte';
</script>

<main>
    <div id="content">
        <slot></slot>
    </div>
</main>

<Nav/>

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
</style>