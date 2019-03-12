<template>
    <div>
        <h1>document</h1>
        <vue-markdown>{{msg}}</vue-markdown>
    </div>
</template>
<script>
import VueMarkdown from 'vue-markdown';
import README from './01.0.md';
export default {
    name: 'document',
    components: { VueMarkdown },
    data() {
        return { msg: README }
    },
    methods: {}
}
</script>