import { AlertTriangle } from 'lucide-react';
import { site } from '../config/site';

type HeaderProps = {
  notice: string | null;
  onDismissNotice: () => void;
};

export function Header({ notice, onDismissNotice }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-inner">
        <div>
          <p className="header-kicker">Doubles match maker</p>
          <h1>{site.appName}</h1>
        </div>
      </div>
      {notice ? (
        <div className="notice" role="status">
          <AlertTriangle aria-hidden="true" size={18} />
          <span>{notice}</span>
          <button type="button" className="text-button" onClick={onDismissNotice}>
            閉じる
          </button>
        </div>
      ) : null}
    </header>
  );
}
