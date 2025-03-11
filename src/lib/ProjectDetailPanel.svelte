<script lang="ts">
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { createEventDispatcher } from 'svelte';
    import { findTechDetails, hexToRgb } from './utils';
    
    // Define props that will be passed from parent
    export let project: {
        id: string;
        name: string;
        shortDescription: string;
        fullDescription: string;
        image: string;
        technologies: string[];
        url?: string;
        github?: string;
        date: string;
    };
    
    // Create dispatcher for events back to parent
    const dispatch = createEventDispatcher();
    
    // Close panel function that notifies parent
    function closePanel() {
        dispatch('close');
    }
    
    // Controls the sequential appearance of sections
    const baseDelay = 100;
    const sectionStep = 80;
</script>

<div class="detail-panel">
    <span class="header-spacer"></span>
    
    <div class="detail-content">
        <!-- Title section -->
        <div class="section" in:fly={{y: -30, duration: 400, delay: baseDelay, easing: cubicOut}}>
            <h2 class="project-title">{project.name}</h2>
            <div class="project-date">{project.date}</div>
        </div>
        
        <!-- Description section -->
        <div class="section" in:fly={{y: -30, duration: 400, delay: baseDelay + sectionStep, easing: cubicOut}}>
            <div class="project-description">
                <h4>About this project</h4>
                <p>{project.fullDescription}</p>
            </div>
        </div>

        <!-- Links section -->
        <div class="section" in:fly={{y: -30, duration: 400, delay: baseDelay + sectionStep * 2, easing: cubicOut}}>
            <div class="project-links">
                {#if project.url}
                    <a href={project.url} target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Visit Website
                    </a>
                {/if}
                
                {#if project.github}
                    <a href={project.github} target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        View Code
                    </a>
                {/if}
            </div>
        </div>

        <!-- Technologies section -->
        <div class="section" in:fly={{y: -30, duration: 400, delay: baseDelay + sectionStep * 3, easing: cubicOut}}>
            <div class="project-technologies">
                <h4>Technologies</h4>
                <div class="tech-tags">
                    {#each project.technologies as techName, i}
                        {@const tech = findTechDetails(techName)}
                        <span class="tech-tag" style="background-color: rgba({hexToRgb(tech.color || '#3c3c3c')}, 0.15);">
                            {#if tech.icon}
                                <span class="tech-icon">{@html tech.icon}</span>
                            {/if}
                            {tech.name}
                        </span>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .detail-panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        background-color: transparent;
        border-radius: 8px;
        overflow: visible;
        box-sizing: border-box;
    }
    
    .header-spacer {
        height: 200px;
    }
    
    .detail-content {
        padding: 1rem 2rem 2rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-sizing: border-box;
    }
    
    .section {
        opacity: 1;
        will-change: transform, opacity;
        box-sizing: border-box;
    }
    
    .project-title {
        font-size: 2rem;
        color: #fff;
        margin: 0;
        position: relative;
    }
    
    .project-date {
        font-size: 0.9rem;
        color: var(--unselected-color);
        position: relative;
        margin-top: 0.5rem;
    }

    .project-description {
        height: 100%;
        box-sizing: border-box;
    }
    
    .project-description h4,
    .project-technologies h4 {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 0.5rem;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        color: var(--timeline-color);
    }
    
    .project-description p {
        line-height: 1.6;
        margin-bottom: 1.5rem;
    }
    
    .project-links {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin: 1rem 0;
    }
    
    .project-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background-color: rgba(60, 60, 60, 0.5);
        color: var(--selected-color);
        text-decoration: none;
        border-radius: 4px;
        transition: all 0.2s ease;
    }
    
    .project-link:hover {
        background-color: rgba(60, 60, 60, 0.8);
    }
    
    .tech-tag {
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
        background-color: rgba(60, 60, 60, 0.5);
        backdrop-filter: blur(5px);
    }

    .tech-icon {
        width: 16px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
        font-weight: bold;
    }
    
    .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 0.8rem;
        margin-bottom: 1rem;
    }
    
    .tech-tag {
        background-color: rgba(60, 60, 60, 0.5);
        border-radius: 4px;
        padding: 0.3rem 0.6rem;
        font-size: 0.8rem;
    }

    @media screen and (max-width: 768px) {
        .header-spacer {
            height: 0;
            display: none;
        }
        
        .detail-content {
            padding: 1.5rem 1.25rem;
        }
        
        .project-title {
            font-size: 1.7rem;
        }
        
        .project-links {
            gap: 0.8rem;
        }
        
        .project-link {
            padding: 0.6rem 1rem;
            min-height: 44px; 
            box-sizing: border-box;
            flex: 1 1 auto;
        }
    }
</style>