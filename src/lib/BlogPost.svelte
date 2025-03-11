<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { findTechDetails, hexToRgb } from './utils';
    
    export let post: {
        id: string;
        title: string;
        date: string;
        summary: string;
        content: string;
        image?: string;
        tags: string[];
    };
    
    // Controls the sequential appearance of sections
    const baseDelay = 100;
    const sectionStep = 80;
</script>

<div class="blog-post-container">
    <!-- Content sections with staggered animations -->
    <div class="post-tags section" in:fly={{y: -30, duration: 400, delay: baseDelay, easing: cubicOut}}>
        {#each post.tags as tag}
            {@const tech = findTechDetails(tag)}
            {#if tech}
                <!-- Technology tag with icon and color -->
                <span class="tag tech-tag" style="background-color: rgba({hexToRgb(tech.color || '#888888')}, 0.15);">
                    {#if tech.icon}
                        <span class="tech-icon">{@html tech.icon}</span>
                    {/if}
                    {tech.name}
                </span>
            {:else}
                <!-- Regular tag -->
                <span class="tag">{tag}</span>
            {/if}
        {/each}
    </div>
    
    <!-- Summary section -->
    <div class="post-summary section" in:fly={{y: -30, duration: 400, delay: baseDelay + sectionStep, easing: cubicOut}}>
        <p class="summary-text">{post.summary}</p>
    </div>
    
    <!-- Main content section -->
    <div class="post-content section" in:fly={{y: -30, duration: 400, delay: baseDelay + sectionStep * 2, easing: cubicOut}}>
        <!-- Use {@html} to render HTML content from the post -->
        {@html post.content}
    </div>
    
    <!-- Bottom section with sharing options or related posts -->
    <div class="post-footer section" in:fly={{y: -30, duration: 400, delay: baseDelay + sectionStep * 3, easing: cubicOut}}>
        <div class="post-meta">
            <span class="separator">•</span>
            <span class="post-date">{post.date}</span>
        </div>
    </div>
</div>

<style>
    .blog-post-container {
        width: 100%;
        color: var(--unselected-color);
        box-sizing: border-box;
    }
    
    .section {
        opacity: 1;
        margin-top: 0.5rem;
        margin-bottom: 1.5rem;
        will-change: transform, opacity;
    }
    
    .post-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 2rem;
    }

    .tag {
        background-color: rgba(60, 60, 60, 0.5);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
    }
    
    .tech-tag {
        display: inline-flex;
        align-items: center;
    }
    
    .tech-icon {
        width: 16px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
    }
    
    .post-summary {
        margin-bottom: 2rem;
        border-left: 3px solid var(--timeline-color);
        padding-left: 1rem;
    }
    
    .summary-text {
        font-size: 1.1rem;
        line-height: 1.6;
        font-style: italic;
        color: var(--selected-color);
    }
    
    .post-content {
        line-height: 1.8;
        font-size: 1rem;
        width: 100%;
        box-sizing: border-box;
        overflow-wrap: break-word;
        word-wrap: break-word;
    }
    
    .post-content :global(h3) {
        margin-top: 2rem;
        margin-bottom: 1rem;
        color: var(--timeline-color);
        font-size: 1.5rem;
    }
    
    .post-content :global(p) {
        margin-bottom: 1.5rem;
    }
    
    .post-content :global(ul), 
    .post-content :global(ol) {
        margin-bottom: 1.5rem;
        padding-left: 1.5rem;
    }
    
    .post-content :global(li) {
        margin-bottom: 0.5rem;
    }
    
    .post-content :global(pre) {
        background-color: rgba(30, 30, 30, 0.6);
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        margin: 1.5rem 0;
        max-width: 100%;
    }
    
    .post-content :global(code) {
        font-family: 'Fira Code', 'Roboto Mono', monospace;
        font-size: 0.9rem;
        line-height: 1.5;
    }
    
    .post-content :global(strong) {
        color: var(--selected-color);
    }
    
    .post-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 3rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .post-meta {
        font-size: 0.9rem;
        color: var(--unselected-color);
        opacity: 0.7;
    }
    
    .separator {
        margin: 0 0.5rem;
    }

    @media screen and (max-width: 768px) {
        .blog-post-container {
            padding: 0;
            width: 100%;
        }
        
        .section {
            margin-left: 0;
            margin-right: 0;
        }
        
        .post-tags {
            margin-bottom: 1.5rem;
        }
        
        .summary-text {
            font-size: 1rem;
        }
        
        .post-content {
            font-size: 0.95rem;
        }
        
        .post-content :global(h3) {
            font-size: 1.3rem;
        }
        
        .post-content :global(pre) {
            margin-left: -1rem;
            margin-right: -1rem;
            padding: 0.75rem;
            border-radius: 0;
            width: calc(100% + 2rem);
        }
        
        .post-content :global(code) {
            font-size: 0.85rem;
        }
        
        .post-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
            margin-top: 2rem;
            padding-top: 1rem;
        }
        
        .post-summary {
            border-left: 2px solid var(--timeline-color);
            padding-left: 0.75rem;
        }
        
        .post-content :global(img) {
            max-width: 100%;
            height: auto;
        }
        
        .post-content :global(table) {
            width: 100%;
            display: block;
            overflow-x: auto;
        }
    }
</style>