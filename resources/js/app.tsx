import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './providers/theme-provider';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

void createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    progress: {
        color: '#4B5563',
    },
    setup({ el, App, props }) {
        const root = createRoot(el!);

        root.render(
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <App {...props} />
            </ThemeProvider>
        );
    },
});
