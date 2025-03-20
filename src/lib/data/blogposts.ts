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
];