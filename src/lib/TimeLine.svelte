<script lang="ts">
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    import DetailPanel from './DetailPanel.svelte';
    import { timelineItems } from './data/timelineitems';
    import { findTechDetails, hexToRgb } from './utils';

    let selectedItemPosition = 0;
    let windowScrollY = 0;

    let isMobile = false;
    let windowWidth = 0;

    type TimelineItem = {
        title: string;
        company: string;
        startDate: Date;
        endDate: Date | null;
        description: string;
        skills: string[];
    };
    
    // Sort items by date (most recent first)
    const sortedItems = [...timelineItems].sort((a, b) => {
        const dateA = a.endDate || new Date();
        const dateB = b.endDate || new Date();
        return dateB.getTime() - dateA.getTime();
    });
    
    // Find date range for timeline
    const now = new Date();
    const latestDate = now;
    const earliestDate = sortedItems.reduce((earliest, item) => {
        return item.startDate < earliest ? item.startDate : earliest;
    }, sortedItems[0]?.startDate || new Date(now.getFullYear() - 3, 0, 1));
    
    // Calculate years to display
    const startYear = earliestDate.getFullYear();
    const endYear = latestDate.getFullYear();
    const timelineYears: number[] = [];
    for (let year = endYear; year >= startYear; year--) {
        timelineYears.push(year);
    }
    
    const numberOfYears = endYear - startYear;
    const baseHeight = 150;
    const yearSpacing = 240;
    const dynamicHeight = Math.max(
        sortedItems.length * baseHeight,
        numberOfYears * yearSpacing,
        600
    );

    // Calculate position on timeline based on date (0-100%)
    function getPositionByDate(date: Date) {
        const totalMs = latestDate.getTime() - earliestDate.getTime();
        const dateMs = date.getTime() - earliestDate.getTime();
        return 100 - (dateMs / totalMs * 100);
    }
    
    // Format date for display
    function formatDate(date: Date) {
        if (!date) return "Present";
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    }
    
    // Calculate lane assignments for parallel duration lines
    function assignLanes() {
        const lanes: string | any[] = [];
        const laneAssignments = new Map();
        
        // Process items in chronological order for lane assignment
        const itemsForLanes = [...sortedItems].sort((a, b) => 
            a.startDate.getTime() - b.startDate.getTime()
        );
        
        itemsForLanes.forEach(item => {
            const startTime = item.startDate.getTime();
            const endTime = (item.endDate || new Date()).getTime();
            
            // Find the first lane with no overlaps
            let laneIndex = 0;
            let laneFound = false;
            
            while (!laneFound) {
                if (!lanes[laneIndex]) {
                    lanes[laneIndex] = [];
                    laneFound = true;
                } else {
                    // Check if this lane has any overlap with current item
                    const hasOverlap = lanes[laneIndex].some((existing: { startDate: Date, endDate: Date | null }) => {
                        const existingStart = existing.startDate.getTime();
                        const existingEnd = (existing.endDate || new Date()).getTime();
                        
                        // Check for overlap
                        return !(endTime < existingStart || startTime > existingEnd);
                    });
                    
                    if (!hasOverlap) {
                        laneFound = true;
                    } else {
                        laneIndex++;
                    }
                }
            }
            
            // Assign item to lane
            lanes[laneIndex].push(item);
            laneAssignments.set(item, laneIndex);
        });
        
        return {
            laneAssignments,
            totalLanes: lanes.length
        };
    }

    const { laneAssignments, totalLanes } = assignLanes();
    
    const selectedItem = writable<TimelineItem | null>(null);

    function selectItem(item: any, event?: MouseEvent) {
        if (event) {
            // Get the clicked element and calculate its position relative to the viewport
            const target = event.currentTarget as HTMLElement;
            const rect = target.getBoundingClientRect();
            
            // Store the y-position (accounting for scroll position)
            selectedItemPosition = rect.top + window.scrollY;
            windowScrollY = window.scrollY;
        }
        
        selectedItem.update(current => {
            // Toggle selection - if already selected, deselect it
            return current === item ? null : item;
        });
    }

    function calculateNonOverlappingPositions() {
        const MIN_PANEL_HEIGHT = 150;
        const positions: { item: TimelineItem; originalPosition: number; height: number }[] = [];
        const adjustedPositions = new Map();
        const sideAssignments = new Map(); // Track left/right side assignments
        
        // First, get all the original positions based on dates
        sortedItems.forEach(item => {
            positions.push({
                item,
                originalPosition: getPositionByDate(item.startDate),
                height: MIN_PANEL_HEIGHT
            });
        });
        
        // Sort positions from top to bottom (lowest % to highest %)
        positions.sort((a, b) => a.originalPosition - b.originalPosition);
        
        // Track last end position for both left and right sides
        let lastEndPositionLeft = -50;
        let lastEndPositionRight = -50;
        
        // Initially prefer right side
        let preferRight = true;
        
        positions.forEach(pos => {
            // Choose the side with more available space
            const useRightSide = lastEndPositionRight <= lastEndPositionLeft;
            
            // Get the relevant last position based on chosen side
            const lastEndPosition = useRightSide ? lastEndPositionRight : lastEndPositionLeft;
            
            // Check if this item would overlap with the last one on the chosen side
            const itemTopPosition = pos.originalPosition;
            const minRequiredPosition = lastEndPosition + 5; // 5% padding
            
            // Set adjusted position to either original or minimum non-overlapping position
            const adjustedPosition = Math.max(itemTopPosition, minRequiredPosition);
            adjustedPositions.set(pos.item, adjustedPosition);
            
            // Update the end position for the chosen side
            if (useRightSide) {
                lastEndPositionRight = adjustedPosition + (MIN_PANEL_HEIGHT / dynamicHeight * 100);
                sideAssignments.set(pos.item, 'right');
            } else {
                lastEndPositionLeft = adjustedPosition + (MIN_PANEL_HEIGHT / dynamicHeight * 100);
                sideAssignments.set(pos.item, 'left');
            }
            
            // Toggle preference for next item when there's contention
            if (Math.abs(lastEndPositionLeft - lastEndPositionRight) < 10) {
                preferRight = !preferRight;
            }
        });
        
        return { adjustedPositions, sideAssignments };
    }
    
    const { adjustedPositions, sideAssignments } = calculateNonOverlappingPositions();

    onMount(() => {
        if (browser) {
            const handleResize = () => {
                windowWidth = window.innerWidth;
                isMobile = windowWidth <= 768;
            };
            
            window.addEventListener('resize', handleResize);
            
            handleResize();
            
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    });
</script>

<div class="timeline-line" style="top: 0; position: absolute; height: {(dynamicHeight + yearSpacing + baseHeight)}px;"></div>
<div class="timeline" style="height: {dynamicHeight}px">
    <!-- Job duration indicators -->
    {#each sortedItems as item, i}
        {#if item.endDate || item.endDate === null}
            {@const laneIndex = laneAssignments.get(item)}
            <div
                role="button" 
                tabindex="0"
                class="job-duration" 
                class:selected={$selectedItem === item}
                on:click|stopPropagation={() => selectItem(item)}
                on:keydown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        selectItem(item);
                    }
                }}
                aria-label={`${item.title} at ${item.company}, ${formatDate(item.startDate)} to ${formatDate(item.endDate || new Date())}`}
                style="top: {getPositionByDate(item.endDate || new Date())}%; 
                       height: {getPositionByDate(item.startDate) - getPositionByDate(item.endDate || new Date())}%;
                       {isMobile ? 
                         'left: 31px; transform: none;' : 
                         `left: calc(50% - ${(20 + 15 * laneIndex)}px);`}">
                <span class="duration-dot end-dot"></span>
                <span class="duration-dot start-dot"></span>
            </div>
        {/if}
    {/each}
    
    <!-- Date markers overlay -->
    <div class="timeline-dates">
        {#each timelineYears as year, i}
            <div class="year-marker" style="top: {getPositionByDate(new Date(year, 0, 1))}%">
                <span class="year-label">{year}</span>
            </div>
        {/each}
    </div>

<!-- Timeline items positioned by date -->
{#each sortedItems as item, i}
    {@const side = sideAssignments.get(item)}
    <div role="button" tabindex="0" class="timeline-item"
        class:left-side={side === 'left' && !isMobile}
        class:right-side={side === 'right' || isMobile}
        class:mobile={isMobile}
         class:selected={$selectedItem === item}
         style="top: {adjustedPositions.get(item)}%"
         on:click|stopPropagation={() => selectItem(item)}
         on:keydown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectItem(item);
            }
          }}>
         <div class="connector-line" style="top: 50%; height: 2px; width: {isMobile ? '30px' : '40px'}; {(side === 'left' && !isMobile) ? 'right: 0px;' : 'left: 0px;'}"></div>
        <div class="timeline-content">
            <h3>{item.title}</h3>
            <h4>{item.company}</h4>
            <div class="timeline-date">{formatDate(item.startDate)} - {formatDate(item.endDate || new Date())}</div>
            <p>{item.description}</p>
            {#each item.skills as skill, i}
                {@const tech = findTechDetails(skill)}
                <span class="tech-tag" style="background-color: rgba({hexToRgb(tech.color || '#3c3c3c')}, 0.15);">
                    {#if tech.icon}
                        <span class="tech-icon">{@html tech.icon}</span>
                    {/if}
                    {tech.name}
                </span>
            {/each}
        </div>
    </div>
    
{/each}

    <!-- Side panel for selected item details -->
    {#if $selectedItem}
    <DetailPanel 
    selectedItem={$selectedItem} 
    on:close={() => selectItem(null)} 
    isMobile={isMobile}
    side={sideAssignments.get($selectedItem)}
    itemPosition={adjustedPositions.get($selectedItem)}
    scrollY={windowScrollY}/>
    {/if}

</div>

<style>
    .timeline {
        position: relative;
        max-width: 800px;
        margin: 40px auto;
        padding: 20px 0;
        width: 100%;
        transition: height 0.5s ease;
    }
    
    .timeline-dates {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        z-index: 0;
        height: 100%;
    }
    
    .year-marker {
        position: absolute;
        left: 0;
        width: 10px;
        height: 2px;
        background-color: var(--timeline-color);
        opacity: 0.6;
    }
    
    .timeline-content {
        position: relative;
        z-index: 2;
        min-height: 110px;
        padding: 15px 20px;
        background-color: rgba(24, 24, 24, 0.6);
        border-radius: 6px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
    }

    .timeline-content h3 {
        font: var(--h3);
        margin: 0;
        margin-top: 1rem;
    }

    .timeline-content h4 {
        margin: 0;
        margin-top: 0.2rem;
        font: var(--h5);
        color: var(--gray90);
    }
    
    .timeline-content:hover {
        transform: translateY(-5px);
        background-color: rgba(24, 24, 24, 0.9);
    }

    .timeline-content p {
        font: var(--p);
        margin: 0;
        margin-top: 1rem;
        margin-bottom: 0.8rem;
    }

    .timeline-date {
        margin: 0;
        margin-top: 0.2rem;
        margin-bottom: 0.5rem;
    }

    .timeline-date {
        margin: 0;
        margin-top: 0.2rem;
        font: var(--p);
        color: var(--gray70);
     }
    .year-label {
        position: absolute;
        left: 15px;
        top: -10px;
        font-size: 0.75rem;
        color: var(--unselected-color);
        white-space: nowrap;
    }
    
    .timeline-item {
        position: absolute;
        width: 50%;
        box-sizing: border-box;
        transform: translateY(-50%);
    }
    
    .timeline-item.right-side {
        right: 0;
        text-align: left;
        padding-left: 40px;
        padding-right: 0;
    }
    
    .timeline-item.left-side {
        left: 0;
        text-align: left;
        padding-right: 40px;
        padding-left: 0;
    }
    
    .timeline-item.right-side .connector-line {
        left: -30px;
        right: auto;
    }
    
    .timeline-item.left-side .connector-line {
        right: -30px;
        left: auto;
    }
    
    .timeline-line {
        position: absolute;
        width: 2px;
        background-color: var(--timeline-color);
        top: 0;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;
        height: 100%;
    }

    .job-duration {
        position: absolute;
        width: 6px;
        border: none;
        border-radius: 3px;
        background-color: var(--job-color);
        z-index: 1;
    }
    
    .duration-dot {
        position: absolute;
        width: 12px;
        height: 12px;
        background-color: var(--job-color);
        border: 2px solid var(--background-color);
        border-radius: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }
    
    .end-dot {
        top: 0;
    }
    
    .start-dot {
        bottom: -1.2vh;
    }

    .timeline-item.selected .timeline-content {
        background-color: rgba(40, 40, 40, 0.9);
        transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
    }
    
    .job-duration.selected {
        width: 8px;
        background-color: var(--selected-job-color, #5cff5c);
        box-shadow: 0 0 8px rgba(var(--timeline-color-rgb), 0.5);
    }
    
    .timeline-item, .job-duration {
        cursor: pointer;
    }
    
    .timeline-content:hover {
        transform: translateY(-5px);
        background-color: rgba(24, 24, 24, 0.9);
    }

    .connector-line {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.15);
        z-index: 1000;
        transition: background-color 0.3s ease;
    }
    
    .timeline-item:hover .connector-line {
        background-color: rgba(255, 255, 255, 0.3);
    }
    
    .timeline-item.selected .connector-line {
        background-color: var(--timeline-color, rgba(255, 255, 255, 0.4));
    }
    
    .timeline-content {
        min-height: 110px;
    }

    .tech-tag {
        display: inline-flex;
        align-items: center;
        border-radius: 4px;
        padding: 0.5rem;
        font-size: 0.8rem;
        background-color: rgba(60, 60, 60, 0.5);
        backdrop-filter: blur(5px);
        margin-right: 0.4rem;
        margin-bottom: 0.4rem;
        line-height: 1;
        vertical-align: middle;
        height: 1.5rem; /* Fixed height for all tags */
        box-sizing: border-box;
    }

    .tech-icon {
        width: 16px;
        height: 16px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-right: 5px;
        font-weight: bold;
        line-height: 1;
        flex-shrink: 0; /* Prevent icon from shrinking */
    }
    
    /* Add this to ensure all SVG icons are vertically aligned */
    .tech-icon :global(svg) {
        vertical-align: middle;
        height: 100%;
        width: 100%;
    }
    
    @media screen and (max-width: 768px) {
        .timeline-line {
            left: 31px;
            transform: none;
        }
        .timeline-dates {
            left: 63px;
            transform: none;
        }
        
        .timeline {
            padding-left: 15px;
            padding-right: 15px;
            margin-left: 0;
            margin-right: 0;
        }
        
        .timeline-item {
            width: calc(100% - 60px);
            padding-left: 40px;
            padding-right: 10px;
            right: 0;
            left: auto;
            box-sizing: border-box;
        }
        
        .timeline-item.mobile {
            width: calc(100% - 60px);
        }
        
        .timeline-item.mobile .timeline-content {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 15px;
        }
        
        .job-duration.mobile {
            width: 5px;
        }
        
        .year-label {
            font-size: 0.7rem;
        }
        
        .connector-line {
            width: 25px !important;
        }
    }
</style>