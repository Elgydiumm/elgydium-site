<script lang="ts">
    import TimeLine from '$lib/TimeLine.svelte';
    import { onMount } from 'svelte';
    import { techStack } from '$lib/data/techstack';
    import { findTechDetails, hexToRgb } from '$lib/utils';
    

    let isMobile = false;

    let portfolioVisible = false;
    let portfolioSection: HTMLElement;

    onMount(() => {
        isMobile = window.innerWidth <= 768;
        
        const handleResize = () => {
            isMobile = window.innerWidth <= 768;
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    portfolioVisible = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.25 //When to start animation (%)
        });

        if (portfolioSection) {
            observer.observe(portfolioSection);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (portfolioSection) {
                observer.unobserve(portfolioSection);
            }
        };
    });
</script>


<link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
<div class="landing">
    <h class="typing-effect typing-header">Elgydium.</h>
    <p class="typing-effect typing-paragraph-name name" class:mobile={isMobile}>Eemeli Väljä</p>
    <p class="typing-effect typing-paragraph" class:mobile={isMobile}>"Well if it was in the assignment then I probably forgot to read it"</p>

    <div class="tech-stack">
        {#each techStack as techName, i}
            {@const tech = findTechDetails(techName)}
            <div class="tech-box" 
                 style="animation-delay: {800 + i * 100}ms; background-color: rgba({hexToRgb(tech.color || '#3c3c3c')}, 0.15);">
                <span class="tech-icon">
                    {@html tech.icon || `<span class="tech-fallback-icon">${tech.name.charAt(0)}</span>`}
                </span>
                <span class="tech-name">{tech.name}</span>
            </div>
        {/each}
    </div>
</div>

<div class="portfolio">
    <h>Work Experience</h>
    <div class="timeline-container" class:visible={portfolioVisible} bind:this={portfolioSection}>
        <TimeLine/>
    </div>
</div>
<style>
    .landing {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 80vh;
        width: 100%;
        box-sizing: border-box;
        padding: 0 20px;
        overflow-x: hidden;
    }

    .landing h {
        font: var(--h);
        text-align: center;
        width: 100%;
        margin-bottom: 2rem;
        padding: 0 10px;
        box-sizing: border-box;
    }

    .landing p {
        font: var(--pl);
        text-align: center;
        width: 100%;
        margin: 0;
        padding: 0 10px;
        box-sizing: border-box;
        opacity: 0;
    }

    .landing p.name {
        font-size: 1.2rem;
        color: var(--gray70);
        margin-top: -1rem;
    }

    .typing-effect {
        overflow: hidden;
        white-space: nowrap;
        width: 0;
    }

    .typing-header {
        animation: typing 1.2s steps(90, end) forwards;
    }
    .typing-paragraph-name {
        animation: typingWithFade 2s steps(760, end) forwards 0.3s;
    }

    .typing-paragraph {
        animation: typingWithFade 2s steps(760, end) forwards 0.7s;
    }

    .typing-paragraph.mobile {
        white-space: normal;
        width: 90%;
        overflow: visible;
        animation: fadeIn 0.4s ease-in-out forwards 0.7s;
    }

    .tech-stack {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        margin-top: 3rem;
        width: 100%;
        max-width: 800px;
    }

    .tech-box {
        display: flex;
        align-items: center;
        padding: 8px 14px;
        border-radius: 6px;
        background-color: rgba(60, 60, 60, 0.15);
        backdrop-filter: blur(5px);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        opacity: 0;
        animation: fadeSlideUp 0.5s ease forwards;
    }

    .tech-box:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .tech-icon {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 8px;
        font-weight: bold;
    }

    .tech-name {
        font: var(--p);
    }

    @keyframes typing {
        from { width: 0 }
        to { width: 100% }
    }

    @keyframes typingWithFade {
        0% { 
            width: 0;
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        100% { 
            width: 100%;
            opacity: 1;
        }
    }

    @keyframes fadeIn {
        from { opacity: 0 }
        to { opacity: 1 }
    }

    @keyframes fadeSlideUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .portfolio {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 2rem 0;
        margin-bottom: 3rem;
    }

    .timeline-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 95vw;
        margin-top: 2rem;
        opacity: 0;
        transform: translateY(10vh);
        transition: opacity 1.6s ease-out, transform 1.6s ease-out;
    }

    .timeline-container.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .portfolio h {
        font: var(--h1);
        width: 100%;
        text-align: center;
        margin: 0 0 20px 0;
        padding: 0 10px;
        box-sizing: border-box;
        opacity: 0;
        animation: fadeSlideUp 1.5s ease forwards 2s;
    }
    @media screen and (max-width: 1024px) {
        .typing-paragraph {
            white-space: normal;
            width: 90%;
            overflow: visible;
            animation: fadeIn 0.4s ease-in-out forwards 0.7s;
        }
    }
    @media screen and (max-width: 768px) {
        .landing h {
            font-size: 2.8rem;
        }

        .landing p {
            font-size: 1.1rem;
        }

        .portfolio h {
            font-size: 2rem;
        }

        .typing-header {
            animation: typing 1s steps(60, end) forwards;
        }

        .tech-stack {
            margin-top: 2rem;
            gap: 8px;
        }

        .tech-box {
            padding: 6px 10px;
        }

        .tech-icon {
            width: 18px;
            height: 18px;
        }

        .tech-name {
            font-size: 0.8rem;
        }

        .portfolio {
            padding: 1rem 0;
            margin-bottom: 2rem;
            width: 95%;
        }
    }

    @media screen and (max-width: 380px) {
        .landing h {
            font-size: 2.2rem;
        }

        .landing {
            height: 70vh;
        }

        .tech-box {
            padding: 5px 8px;
        }

        .tech-name {
            font-size: 0.75rem;
        }
    }
</style>