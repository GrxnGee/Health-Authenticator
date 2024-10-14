import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          profile: "Profile",
          name: "Name",
          phoneNumber: "Phone Number",
          email: "Email",
          settings: "Settings",
          logout: "Log out",
          translate: "Translate to Thai",
          today: "Today",
          calories: "Calories",
          remaining: "Remaining = Goal - Food + Exercise",
          baseGoal: "Base Goal",
          food: "Food",
          exercise: "Exercise",
          availableplans: "Available plans",
          mealplans: "Meal plans",
          startcalculate: "Start calculate",
          weightChart: "Weight Chart",
          exerciseChart: "Exercise Chart",
          home: "Home",
          exerciseCategories: "Exercise Categories",
          weightTraining: "Weight Training",
          stretching: "Stretching",
          cardio: "Cardio",
          loading: "Loading...",
          privacyPolicy: "Privacy Policy"
        }
      },
      th: {
        translation: {
          profile: "โปรไฟล์",
          name: "ชื่อ",
          phoneNumber: "หมายเลขโทรศัพท์",
          email: "อีเมล",
          settings: "การตั้งค่า",
          logout: "ออกจากระบบ",
          translate: "แปลเป็นภาษาอังกฤษ",
          today: "วันนี้",
          calories: "แคลอรี่",
          remaining: "เหลือ = เป้าหมาย - อาหาร + การออกกำลังกาย",
          baseGoal: "เป้าหมายพื้นฐาน",
          food: "อาหาร",
          exercise: "การออกกำลังกาย",
          availableplans: "วิธีการออกกำลังกาย",
          mealplans: "อาหาร",
          startcalculate: "เริ่มคำนวณ",
          weightChart: "กราฟน้ำหนัก",
          exerciseChart: "กราฟการออกกำลังกาย",
          home: "หน้าหลัก",
          exerciseCategories: "หมวดหมู่การออกกำลังกาย",
          weightTraining: "การฝึกด้วยน้ำหนัก",
          stretching: "การยืดเหยียด",
          cardio: "คาร์ดิโอ",
          loading: "กำลังโหลด...",
          privacyPolicy: "นโยบายความเป็นส่วนตัว"
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;