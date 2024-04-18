import { describe, it, expect } from 'vitest';
import { actionBar, addContextInfo, contextRoutes, lockEditMode } from './actions';
import { actionBarEntries, contextInfo, contextRouteEntries, lockModeToggle, mode } from './stores';
import { get } from 'svelte/store';
import type { ActionBarEntryProps } from './models/ActionBarEntry.interface';
import type { SideMenuRoute } from './components/menus/sidemenu/SideMenu.model';

describe('svelte actions', () => {
  describe('actionBar', () => {
    const entries: ActionBarEntryProps[] = [
      {
        icon: 'testicon1',
        label: 'testlabel1',
        action: '/test/1'
      }
    ];
    const element = document.createElement('div');
    const { update, destroy } = actionBar(element, entries)!;
    it('should initialize', () => {
      expect(get(actionBarEntries)).toStrictEqual(entries);
    });
    it('should update', () => {
      const newEntries = [
        ...entries,
        {
          icon: 'testicon2',
          label: 'testlabel2',
          action: '/test/2'
        }
      ];
      update!(newEntries);
      expect(get(actionBarEntries)).toStrictEqual(newEntries);
    });
    it('should destroy', () => {
      destroy!();
      expect(get(actionBarEntries)).toStrictEqual([]);
    });
  });

  describe('contextRoutes', () => {
    const entries: SideMenuRoute[] = [
      {
        icon: 'testicon1',
        name: 'testlabel1',
        href: '/test/1'
      }
    ];
    const element = document.createElement('div');
    const { update, destroy } = contextRoutes(element, entries)!;
    it('should initialize', () => {
      expect(get(contextRouteEntries)).toStrictEqual(entries);
    });
    it('should update', () => {
      const newEntries = [
        ...entries,
        {
          icon: 'testicon2',
          name: 'testlabel2',
          href: '/test/2'
        }
      ];
      update!(newEntries);
      expect(get(contextRouteEntries)).toStrictEqual(newEntries);
    });
    it('should destroy', () => {
      destroy!();
      expect(get(contextRouteEntries)).toStrictEqual([]);
    });
  });

  describe('addContextInfo', () => {
    const message = 'hi';
    const element = document.createElement('div');
    contextInfo.set([]);
    const { update, destroy } = addContextInfo(element, { message })!;
    it('should initialize', () => {
      expect(get(contextInfo)).toStrictEqual([message]);
    });
    it('should update', () => {
      const newMessage = 'hello';
      update!({ message: newMessage });
      expect(get(contextInfo)).toStrictEqual([newMessage]);
    });
    it('should destroy', () => {
      destroy!();
      expect(get(contextInfo)).toStrictEqual([]);
    });
  });

  describe('lockEditMode', () => {
    const element = document.createElement('div');
    mode.set('edit');
    const { update, destroy } = lockEditMode(element, true)!;
    it('should initialize', () => {
      expect(get(lockModeToggle)).toStrictEqual(true);
    });
    it('should update', () => {
      update!(false);
      expect(get(lockModeToggle)).toStrictEqual(false);
      update!(true);
      expect(get(lockModeToggle)).toStrictEqual(true);
      mode.set('view');
      expect(get(lockModeToggle)).toStrictEqual(false);
      mode.set('edit');
      expect(get(lockModeToggle)).toStrictEqual(true);
    });
    it('should destroy', () => {
      destroy!();
      expect(get(lockModeToggle)).toStrictEqual(false);
    });
  });
});
