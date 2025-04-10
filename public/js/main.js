document.addEventListener('DOMContentLoaded', () => {
    // Add any client-side interactive features here
    console.log('Task Manager application loaded');

    // Fade in tasks on page load
    const tasksItems = document.querySelectorAll('.task-item');
    tasksItems.forEach((item, index) => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.transtion = 'opacity 0.5s ease-in-out';
            item.style.opacity = '1';
        }, index * 100);
    });
});