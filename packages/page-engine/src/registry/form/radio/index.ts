import Radio from './radio';
import ConfigForm from './config-form';
import type { SourceElement } from '../../../index';

type Props = {
  name?: string
}

const defaultConfig: Props = {};

const elem: SourceElement<Props> = {
  name: 'radio',
  icon: 'apps',
  label: '单选',
  category: 'form',
  component: Radio,
  configForm: ConfigForm,
  defaultConfig,
  order: 3,
};

export default elem;
