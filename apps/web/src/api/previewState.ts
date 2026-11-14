export type PreviewDataState = 'data' | 'loading' | 'empty' | 'error';

export function getPreviewState(): PreviewDataState {
  if (typeof window === 'undefined') {
    return 'data';
  }

  const search = new URLSearchParams(window.location.search);
  const forced = search.get('previewState') as PreviewDataState | null;
  if (forced === 'data' || forced === 'loading' || forced === 'empty' || forced === 'error') {
    return forced;
  }

  const stored = window.localStorage.getItem('previewState');
  if (stored === 'data' || stored === 'loading' || stored === 'empty' || stored === 'error') {
    return stored;
  }

  return 'data';
}

export function setPreviewState(state: PreviewDataState): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('previewState', state);
  }
}
