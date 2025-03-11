<script lang="ts">
    import { writable } from 'svelte/store';
    import { fade, fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import ProjectDetailPanel from '$lib/ProjectDetailPanel.svelte';
    import { projects } from '$lib/data/projects';
    import { findTechDetails, hexToRgb } from '$lib/utils';
    import { onMount } from 'svelte';

    let mounted = false;

    type Project = typeof projects[0];

    const selectedProject = writable<Project | null>(null);
    
    let isAnimating = false;
    

    onMount(() => {
        mounted = true;
    });

    function toggleProject(project: Project) {
        if (isAnimating) return;
        
        isAnimating = true;
        setTimeout(() => { isAnimating = false; }, 400);
        
        selectedProject.update(current => {
            return current?.id === project.id ? null : project;
        });
    }
    
    function closeExpandedView() {
        if (isAnimating) return;
        selectedProject.set(null);
    }
    
    function getInitialDelay(index: number): number {
        return 150 + (index * 100); // Base delay + staggered effect
    }
</script>

<div class="projects-container">
    <h1 class="page-title" in:fade={{duration: 600, delay: 100}}>Projects</h1>
    
    <div class="projects-grid">
        {#each projects as project, index (project.id)}
            <div class="project-card-container">
                {#if mounted}
                    <div 
                        class="project-card"
                        class:hidden={$selectedProject?.id === project.id}
                        in:fly={{y: 30, duration: 600, delay: getInitialDelay(index), easing: cubicOut}}
                        on:click={() => toggleProject(project)}
                        on:keydown={(e) => e.key === 'Enter' && toggleProject(project)}
                        role="button" tabindex="0">
                        
                        <div class="project-image" style="background-image: url('{project.image || '/images/placeholder.jpg'}')">
                            <div class="project-overlay"></div>
                        </div>
                        
                        <div class="project-content">
                            <h2>{project.name}</h2>
                            <p class="project-description">{project.shortDescription}</p>
                            <div class="tech-preview">
                                {#each project.technologies.slice(0, 3) as techName, i}
                                {@const tech = findTechDetails(techName)}
                                <span class="tech-tag" style="background-color: rgba({hexToRgb(tech.color || '#3c3c3c')}, 0.15);">
                                    {#if tech.icon}
                                        <span class="tech-icon">{@html tech.icon}</span>
                                    {/if}
                                    {tech.name}
                                </span>
                                {/each}
                                {#if project.technologies.length > 3}
                                    <span class="more-tag">+{project.technologies.length - 3}</span>
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    
    {#if $selectedProject}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div 
            class="expanded-overlay" 
            transition:fade={{duration: 250}}
            on:click={closeExpandedView}>
            {#each projects.filter(p => p.id === $selectedProject.id) as project (project.id)}
                <div 
                    class="project-card expanded"
                    in:fly={{y: -30, duration: 400, easing: cubicOut}}
                    out:fly={{y: -30, opacity: 0, duration: 300, easing: cubicOut}}
                    on:click|stopPropagation>
                    
                    <button class="close-btn" on:click={closeExpandedView}>
                        <span>×</span>
                    </button>
                    
                    <div class="project-image" style="background-image: url('{project.image || '/images/placeholder.jpg'}')">
                        <div class="project-overlay"></div>
                    </div>
                    
                    <div class="detail-container">

                        <div class="scrollable-content">
                            <ProjectDetailPanel project={project} on:close={closeExpandedView}/>
                        </div>

                        <div class="fade-edge bottom"></div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div
>
<style>
    .projects-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        position: relative;
    }

    .page-title {
        font-size: 3rem;
        margin-bottom: 2rem;
        text-align: center;
        color: var(--selected-color);
    }

    .projects-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .project-card-container {
        height: 350px;
        transition: opacity 0.3s ease;
    }

    .project-card {
        background-color: rgba(24, 24, 24, 0.6);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        cursor: pointer;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        will-change: transform, opacity;
    }
    
    .project-card.hidden {
        opacity: 0;
        pointer-events: none;
    }
    
    .project-card.expanded {
        position: relative;
        width: 90%;
        max-width: 800px;
        height: 80vh;
        max-height: 700px;
        z-index: 100;
        background-color: rgba(24, 24, 24, 0.95);
        cursor: default;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        margin: auto;
    }

    .project-card:not(.expanded):hover {
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
        background-color: rgba(24, 24, 24, 0.9);
    }

    .project-card:focus {
        outline: 2px solid var(--selected-color);
    }

    .project-image {
        height: 180px;
        background-size: cover;
        background-position: center;
        position: relative;
        transition: height 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        box-sizing: border-box;
    }

    .expanded .project-image {
        height: 200px;
    }

    .project-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, 
                  rgba(0,0,0,0.1) 0%,
                  rgba(0,0,0,0.6) 100%);
    }

    .project-content {
        padding: 1.5rem;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
    }

    .project-content h2 {
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        color: var(--selected-color);
    }

    .project-description {
        margin-bottom: auto;
        color: var(--unselected-color);
        font-size: 0.95rem;
        box-sizing: border-box;
    }

    .tech-preview {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-top: 1rem;
    }

    .tech-tag, .more-tag {
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

    .more-tag {
        background-color: rgba(30, 255, 0, 0.15);
        color: var(--selected-color);
    }

    .expanded-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 50;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }

    .close-btn {
        position: absolute;
        top: 0.4rem;
        right: 0rem;
        background-color: rgba(0, 0, 0, 0.5);
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: white;
        font-size: 1.8rem;
        line-height: 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 101;
        transition: all 0.2s ease;
    }
    
    .close-btn:hover {
        background-color: rgba(60, 60, 60, 0.9);
        transform: scale(1.1);
    }
    
    .close-btn span {
        margin-bottom: 2px;
    }

    .detail-container {
        position: absolute;
        top: 200px; /* Position it to start after the image */
        left: 0;
        width: 100%;
        height: calc(100% - 200px); /* Adjust height to account for image */
        overflow: hidden;
    }
    
    .scrollable-content {
        height: 100%;
        overflow-y: auto;
        padding-bottom: 30px;
    }
    
    .fade-edge {
        position: absolute;
        left: 0;
        width: 100%;
        height: 40px;
        pointer-events: none;
        z-index: 5;
    }
    
    
    .fade-edge.bottom {
        bottom: 0;
        background: linear-gradient(to top, 
                    rgba(24, 24, 24, 0.95) 0%, 
                    rgba(24, 24, 24, 0) 100%);
    }

    @media screen and (max-width: 768px) {
        .projects-grid {
            grid-template-columns: 1fr;
        }
        
        .expanded-overlay {
            padding: 1rem;
        }
        
        .project-card.expanded {
            width: 95%;
            height: 85vh;
        }
        .project-overlay {
            display: none;
        }
    }
</style>