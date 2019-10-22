import LocalizedStrings from 'react-native-localization';


const label = new LocalizedStrings({
    en: {
        order_text: 'I need a doctor',
        set_order_location: 'Set order location!',
        skip_label:'Skip',
        submit_label: 'SUBMIT!',
        submit_schedule_label: 'SCHEDULE iDOQTOR!',
        finding_doctors:'Finding near you Doctors ...'
    },
    ar: {
        order_text: 'أحتاج لطبيب ',
        set_order_location: 'حدد نقطة الوصول ',
        skip_label:'تخطی',
        submit_label: 'إرسل!',
        submit_schedule_label: 'إرسل موعد الطلب!',
        finding_doctors:'جاري البحث عن الاطباء ...'
    }
});

export default label;