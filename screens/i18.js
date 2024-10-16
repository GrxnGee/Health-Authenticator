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
          privacyPolicy: "Privacy Policy",
          home: "Home",
          mealplans: "Your Plan",
          search: "Search",
          categories: "Categories",
          recommendedMenu: "Recommended Menu",
          noItemsFound: "No items found",
          Addtomeal: "Add to Meal",
          Ingredient: "Ingredient",
          Calorie: "Calorie",
          addedToMealPlan: "Added to your meal plan!",
          FoodList: "FoodList",
          Food: "FoodList",
          delete: "Delete",
          total: "Total",
          meal: "Meal",
          RecommendedExercises: "Recommended Exercises",
          
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
          privacyPolicy: "นโยบายความเป็นส่วนตัว",
          home: "หน้าหลัก",
          mealplans: "แผนของคุณ",
          search: "ค้นหา",
          categories: "หมวดหมู่",
          recommendedMenu: "เมนูแนะนำ",
          noItemsFound: "ไม่พบรายการ",
          addToMeal: "เพิ่มลงในมื้ออาหาร",
          Ingredient: "ส่วนผสม",
          Calorie: "แคลอรี่",
          Addtomeal: "เพิ่มมื้ออาหาร",
          FoodList: "มื้ออาหาร",
          Food: "อาหาร",
          delete: "ลบ",
          total: "รวม",
          meal: "มื้อ",
          RecommendedExercises: "การออกกำลังกายที่แนะนำ",
        }
      }
    },
    //compatibilityJSON: 'v3',
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;