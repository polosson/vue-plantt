import { shallowMount } from '@vue/test-utils';
import Plantt from '@/components/Plantt.vue';

describe('Plantt.vue', () => {
    it('renders props.msg when passed', () => {
        const msg = 'new message';
        const wrapper = shallowMount(Plantt, {
            propsData: { msg },
        });
        expect(wrapper.text()).toMatch(msg);
    });
});
