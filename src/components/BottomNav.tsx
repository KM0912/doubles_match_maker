import { History, Settings, Trophy } from 'lucide-react';
import type { AppTab } from '../types';

type BottomNavProps = {
  selectedTab: AppTab;
  onSelect: (tab: AppTab) => void;
};

const items: Array<{ tab: AppTab; label: string; icon: typeof Trophy }> = [
  { tab: 'matches', label: '試合', icon: Trophy },
  { tab: 'settings', label: '設定', icon: Settings },
  { tab: 'history', label: '履歴', icon: History },
];

export function BottomNav({ selectedTab, onSelect }: BottomNavProps) {
  return (
    <nav className="bottom-nav" aria-label="画面切り替え">
      {items.map((item) => {
        const Icon = item.icon;
        const selected = selectedTab === item.tab;
        return (
          <button
            key={item.tab}
            type="button"
            className={selected ? 'nav-button active' : 'nav-button'}
            onClick={() => onSelect(item.tab)}
            aria-current={selected ? 'page' : undefined}
          >
            <Icon aria-hidden="true" size={20} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
