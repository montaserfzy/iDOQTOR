import LocalizedStrings from 'react-native-localization';


const String = new LocalizedStrings({
    en: {
        language: "Language",
        birthOfDateLabel: "What is your date of birth?",
        genderLabel: "What is your gender?",
        changePasswordLabel: "Change password",
        signOutLabel: "Sign Out",
        confirm_schedule: 'Confirm order time',
        confirm_schedule_title: 'Select your order time',
        cancel_request: 'Cancel request',
        got_it: 'Got it!',
        schedule_notes: 'You will be notice once the doctor is on the way',
        schedule_date_title: (day, time) => `Your visit is ${day} at ${time} AM\nhas been confirmed`,
        arabic:'Arabic',
        english:'English',
        current_lang:'English',
        male:'Male',
        female:'Female',
        not_set:'Not set',
        order_history_btn:'HISTORY',
        order_schedule_btn:'SCHEDULED',
        quick_help_label:'QUICK HELP',
        more_help_topic:'MORE HELP TOPIC',
        or:'or',
        connect_to_facebook:'connect with facebook',
        will_sent_a_code_note:'We will send a code to your mobile number to verify your account',
        edit_phone_number:'Edit my phone number',
        not_received_code:'I didn\'t receive a code',
        resend_code:'Resend code in',
        navigation: {
            your_orders: 'Your orders',
            notifications: 'Notifications',
            help: 'Help',
            settings: 'Setting',
            become_doctor:'Become a Doctor'
        },
        headers:{
            your_orders: 'Your orders',
            notifications: 'Notifications',
            help: 'Help',
            settings: 'Setting',
            location:'Locations'
        },
        placeholders:{
            enter_your_number:'Enter your mobile number',
            enter_your_full_name:'Enter your full name',
            enter_your_email:'Enter your email'
        },
        title:{
            enter_your_phone:'Enter your mobile number',
            enter_the_verify_code:`Enter the 6-digit code sent to you at`,
            enter_full_name_email:'Enter your full name and email address',
            enter_full_name:'Enter your full name',
            what_is_your_gender:'What is your gender ?',
            what_is_your_date_birth:'What is your birth of date ?',
            request_your_doctor:'Request doctor now'
        },
        subtitle:{
            your_name_visible:`Your name makes it easy for Doctors to confirm\nwho they are confirm your order`,
            your_email_visible: `Receive info about new updates in you inbox`
        },
        buttons:{
            submit:'Submit'
        },
        text_loop:{
            home:'home',
            school:'school',
            university:'university',
            work:'work',
            restaurant:'restaurant',
            mall:'mall',
            park:'park',
            hotel:'hotel',
            on_call:"On call at "
        },
        alert:{
            enableGPS:'Please enable the GPS services',
            gpsDisabled:'GPS Disabled!'
        },
        style:{
            input_number:{},
            input_phone:{
                display:'flex',
                flexDirection:'row'
            }
        }
    },
    ar: {
        language: "اللغة",
        birthOfDateLabel: 'تاريخ الميلاد',
        genderLabel: "الجنس",
        changePasswordLabel: "تغير الرقم السري الخاص بك",
        signOutLabel: "تسجيل الخروج",
        confirm_schedule: 'اكد وقت الحجز',
        confirm_schedule_title: 'اكد وقت الحجز',
        cancel_request: 'الغاء الحجز',
        got_it: 'تم!',
        schedule_notes: 'سوف يتم إعلامك قبل إنطلاق الطبيب الي موقعك',
        schedule_date_title: (day, time) => ` موعد زيارة الطبيب ${time} - ${day} `,
        arabic:'العربية',
        english:'الانجليزية',
        current_lang:'العربية',
        male:'ذكر',
        female:'انثى',
        not_set:'غير محدد',
        order_history_btn:'الطلبات السابقة',
        order_schedule_btn:'الطلبات المؤجلة',
        quick_help_label:'مساعدة سريعة',
        more_help_topic:'مواضيع مساعدة اخرى',
        or:'أو',
        connect_to_facebook:'تابع بواسطة فيسبوك',
        will_sent_a_code_note:'سوف يتم ارسال رمز التحقق الي هاتفك المحمول',
        edit_phone_number:'تعديل رقم الهاتف',
        not_received_code:'لم أجد رقم التحقق',
        resend_code:'يمكنك إعادت إرسال الرمز خلال',
        navigation: {
            your_orders: 'الطلبات',
            notifications: 'التنبيهات',
            help: 'المساعدة',
            settings: 'الإعدادات',
            become_doctor:'أنظم الي اطبائنا',
        },
        headers:{
            your_orders: 'الطلبات',
            notifications: 'التنبيهات',
            help: 'المساعدة',
            settings: 'الإعدادات',
            location:'المواقع'
        },
        placeholders:{
            enter_your_number:'أدخل رقمك الهاتف',
            enter_your_full_name:'أدخل أسمك كاملااً',
            enter_your_email:'أدخل البريد الإلكتروني',
        },
        title:{
            enter_your_phone:'أدخل رقمك الهاتف',
            enter_the_verify_code:'أدخل الرمز الخاص بك المكون من ٦ أرقام',
            enter_full_name_email:'أدخل أسمك كاملا و البريد الإلكترونيً',
            enter_full_name:'أدخل أسمك كاملا ',
            what_is_your_gender:'ما هو الجنس ؟',
            what_is_your_date_birth:'ما هو تاريخ الميلاد؟',
            request_your_doctor:'أطلب طبيبك ألان'
        },
        subtitle:{
            your_name_visible:`أسم المستخدم يساعد الطبيب في التعامل مع طالب الزيارة`,
            your_email_visible: `سيتم تزيدك بالمعلومات حول التطبيق والتحديثات`
        },
        buttons:{
            submit:'أرسل'
        },
        text_loop:{
            home:'منزلك',
            school:'مدرستك',
            university:'جامعتك',
            work:'عملك',
            restaurant:'المطعم',
            mall:'المول',
            park:'المنتزه',
            hotel:'الفندق',
            on_call:"نصلك في "
        },
        alert:{
            enableGPS:'الرجاء تشغيل خدمة نظام المواقع',
            gpsDisabled:' خدمة المواقع غير مفعلة!'
        },
        style:{
            input_number:{
                textAlign:'right',
                justifyContent: 'flex-end',
                paddingLeft:5
            },
            input_phone:{
                display:'flex',
                flexDirection:'row-reverse'
            }
        }

    }
});

export default String;