<script>
    import PostList from "$lib/PostList.svelte";
    import {page} from "$app/stores";

    function getTitle(type) {
        return type === "blog" ? "Personal blog" : "Projects";
    }
</script>

<PostList src={$page.params.type} title={getTitle($page.params.type)}/>