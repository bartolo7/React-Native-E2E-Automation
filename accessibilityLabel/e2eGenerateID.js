export const setAccessibilityProps = id => process.env.GENERATE_AL ? { accessibilityLabel: id } : {};



export const setAccessibilityPropsArray = id => process.env.GENERATE_AL ? { accessibilityLabels: id } : {};

/* Example:it can be used with SegementedControlTab 
  <SegmentedControlTab
    values={['First', 'Second', 'Third']}
    selectedIndex={this.state.selectedIndex}
    onTabPress={this.handleIndexChange}
    {...setAccessibilityPropsArray(['TAB_0', 'TAB_1'])}
    /> */

export const getAL = id => process.env.GENERATE_AL ? id : null;

/* Example: 
renderSections = () => {
  const section = [
    {
      title: t('TITTLE'),
      content: this.renderDate(),
      accessibilityLabel: getAL('SECTION_1'),
    },
  ];

}*/

export const isNotAccessible = () => process.env.GENERATE_AL ? { accessible: false } : {};

export default {
  setAccessibilityProps,
  setAccessibilityPropsArray,
  accessibilityLabel,
  testProperties,
  isNotAccessible
};
