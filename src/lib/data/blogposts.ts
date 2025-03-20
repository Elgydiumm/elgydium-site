export const blogPosts = [
    {
        id: 'test_post',
        title: 'Test Post',
        date: new Date("2025-03-10"),
        summary: 'A post to test the blog.',
        content: `
        <h3>Test Heading</h3>  
        <p>This is a test post to test the blog. Here is a code block:</p>
        <pre><code">console.log('Hello, World!');</code></pre>
        <p>Here is a list:</p>
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
        <p>Here is a link: <a href="https://www.example.com">Example</a></p>
        <p>Here is an image:</p>
        <img src="/logo.png" alt="Test Image" />
        <p>That's it!</p>
        `,
        image: '',
        tags: ['Web Development', 'Svelte', 'JavaScript']
    },
    {
        id: 'llm_software_development',
        title: 'The usage of LLMs in software development',
        date: new Date("2025-03-20"),
        summary: 'A developer rambling about LLMs in software development.',
        content: `
        <p>LLMs were all the heat in 2024, and kept up that pace going into 2025, but are seeming to have reached an apotheosis, at least without improvements to how they are developed and design from a basic point of view. Sure, new moderately better models probably will come, but specifically in programming the current way they function doesn't allow for huge leaps in productivity from the current Claude 3.7 Sonnet model.</p>
        <h3>The Good</h3>
        <p>Language learning models, when prompted properly, are able to be used extremely efficiently for gathering information similarly to how most are used to googling problems on Stack Overflow or such a website.</p>
        <p>In addition to this, at least in my experience the addition of using copilot has substancially sped up basic level programming, with the autocompletion features and such. I find using copilot to increase my productivity surprisingly much, due to the capability of being able to autocomplete a lot of boilerplate, and focus on the actual coding part.</p>
        <p>Additionally through my experience, I find LLMs quite capable at well established technologies like Web Development, which it has plenty of training data on. They are quickly able to generate large parts of code, while not requiring a huge amount of refactoring of the code to be done. While getting the codebase looking good, and functioning as you want takes some work, if you already know how to make the things you ask an AI to do for you, it certainly saves time.</p>
        <h3>The Bad</h3>
        <p>As quite well known, LLMs are very confident that they are correct, and quite often give you a slightly wrong answer if you're working on something that hasn't been solved on the internet a million times already. While it is inherently a flaw in AI adoption, it isn't nearly as bad as you might think it to be, as most of the time if the AI is making mistakes while working on something, it has the correct idea and you just need to read through it's solution and write it out yourself to fix the problems, and even in the cases where the AI model is wrong, it tends to replace google for you right in your editor, and you can just look through what it was trying to do and figure out how to actually do it.</p>
        <p>There is also a major problem with the fact that using LLMs certainly worsens basic programming skills. In a way you can think of it like nails made in a factory, when they first began being made in a factory they were certainly worse quality than normal nails, and you would be better off making them yourself. But over time they improved, and became the standard instead of blacksmithing nails, as it was cheaper, quicker, and just all in all more efficient. I believe using AI in development is a natural progression of the field, and shouldn't be something to be feared, and instead should be embraced and learned. When used correctly you certainly can overcome the bad aspects of it.</p>
        <h3>The Ugly</h3> 
        <p>The ugh. Ugly.</p>
        <pre><code>// Rest of your script remains unchanged</code></pre>
        <pre><code>// Prints out "Hello World!\nconsole.log("Hello World!");S</code></pre>
        <p>The models tend to overcomment their work as a means of communicating with the person using it, and is not really such a major issue as it is annoying having to go around cleaning up your codebase. Though on the other hand while this is annoying and takes time and effort it also incentivises you to read through your codebase and understand wether a comment is necessary or not. It also promotes refactoring parts of a code to be clearer to remove the need for unnecessary commenting. I find the constant comments by models to be annoying, but also help me to not just be lazy and not read through the code and force me to understand what the generated code, no matter how simple, does to promote me to remove the comment as unnecessary.</p>
        <h3>The takeaway?</h3>
        <p>AI is cool, and has changed and will continue to change the field of software development in major ways. I believe it to be an important corner of improved productivity in coding, and that it will be implemented into most programmers daily workflow in some way.
        `,
        image: '',
        tags: ['Software Development', 'LLMs']
    },
];