import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@app/App';
import { AppProviders } from '@app/providers/AppProviders';
import '@app/styles/globals.css';

/**
 * MSW runs in every environment, not just dev: this app has no real
 * backend in any phase of the roadmap (see docs/adr/0002), so the mock
 * layer is the permanent data source, including in the deployed build.
 */
async function enableMocking() {
  const { worker } = await import('@shared/api/mocks/browser');
  await worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error('Root element #root not found');

  createRoot(rootElement).render(
    <StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </StrictMode>,
  );
});
