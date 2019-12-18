import { Nav } from '@alifd/next';
import * as React from 'react';
import { t } from 'share/core/utils';
import { browser } from 'webextension-polyfill-ts';
import GroupSelect from './components/groupSelect';
import ImportAndExportSection from './components/importAndExport';
import OptionsSection from './components/options';
import RulesSection from './components/rules';
import './index.less';

interface OptionsState {
  active: string;
}
export default class Options extends React.Component<any, OptionsState> {
  constructor(props: any) {
    super(props);

    this.handleSwitch = this.handleSwitch.bind(this);

    this.state = {
      active: 'rules',
    };
  }

  handleSwitch(selectedKeys: string[]) {
    const active = selectedKeys[0];
    if (active && active !== this.state.active) {
      // 如果是帮助，不进行切换，打开新标签页
      if (active === 'help') {
        browser.runtime.sendMessage({
          method: 'openURL',
          url: t('url_help'),
        });
      } else {
        this.setState({
          active,
        });
      }
    }
  }

  render() {
    return (
      <div className="page-options">
        <Nav
          className="navbar"
          direction="hoz"
          type="secondary"
          selectedKeys={[this.state.active]}
          onSelect={this.handleSwitch}
        >
          <Nav.Item key="rules">{t('rule_list')}</Nav.Item>
          <Nav.Item key="options">{t('options')}</Nav.Item>
          <Nav.Item key="export_and_import">{t('export_and_import')}</Nav.Item>
          <Nav.Item key="help">{t('help')}</Nav.Item>
        </Nav>
        <main className="main-content">
          <RulesSection visible={this.state.active === 'rules'} />
          <OptionsSection visible={this.state.active === 'options'} />
          <ImportAndExportSection visible={this.state.active === 'export_and_import'} />
        </main>
        <GroupSelect />
      </div>
    );
  }
}
