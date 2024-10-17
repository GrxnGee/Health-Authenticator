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
          entertoday: "Enter Today's Exercise Data",
          Submit: "Submit",
          SelectaCategory:"Selecta Category",
          SelectType:"Select Exercise Type",          
          HoursEx:"Hours exercised",
          selectEx:"Select Exercise Type",
          BMI: "BMI",
          height: "Height",
          weight: "Weight",
          cm: "cm",
          kg: "kg",
          calculate: "Calculate",
          littleToNoExercisez: "Little to no exercise",
          lightExercise: "Light exercise",
          moderateExercise: "Moderate exercise",
          heavyExercise: "Heavy exercise",
          veryHeavyExercise: "Very heavy exercise",
          error: "Error",
          pleaseFillAllFields: "Please fill in all fields",
          invalidInputValues: "Invalid input values",
          dataProcessedSuccessfully: "Height and weight data processed successfully!",
          failedToProcessData: "Failed to process height and weight data",   
          requestingCameraPermission: "Requesting camera permission...",
          cameraAccessDenied: "Camera access denied",
          barcodeScanner: "Barcode Scanner",
          loadingData: "Loading data...",
          scanBarcodeForFoodInfo: "Scan the barcode to see food information",
          noFoodDataFound: "No food data found",
          errorFetchingData: "Error fetching data",
          success: "Success",
          foodItemAdded: "Food item added to your meal plan!",
          error: "Error",
          failedToAddFoodItem: "Failed to add food item to your meal plan.",
          scanner: "Scanner",
          brand: "Brand",
          productName: "Product Name",
          energy: "Energy",
          sugar: "Sugar",
          fat: "Fat",
          protein: "Protein",
          noProductName: "No product name found",
          noData: "No data found",
          adding: "Adding...",
          addToMeal: "Add to meal",
          chatBot: "Chat Bot",
          typeYourMessage : "Type your message...",
          send: "Send",
          profileSetting: "Profile Setting",
          name: "Name",
          email: "Email",
          birthdate: "Birthdate",
          height: "Height (cm)",
          weight: "Weight (kg)",
          gender: "Gender",
          selectGender: "Select Gender",
          saveChanges: "Save Changes",
          errorFetchingUserData: "Failed to fetch user data.",
          profileUpdated: "Profile updated!",
          errorUpdatingProfile: "Failed to update profile.",
          noDocument: "No such document!"
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
          entertoday: "ใส่ข้อมูลการออกกำลังกายวันนี้",
          Submit: "ตกลง",
          SelectaCategory:"เลือกประเภท",
          SelectType:"เลือกประเภทการออกกำลังกาย",    
          HoursEx:"ชั่วโมงการออกกำลังกาย",
          selectEx:"เลือกการออกกำลังการ",
          BMI: "ดัชนีมวลกาย",
          height: "ส่วนสูง",
          weight: "น้ำหนัก",
          cm: "ซม.",
          kg: "กก.",
          calculate: "คำนวณ",
          littleToNoExercisez: "ออกกำลังกายน้อยมาก",
          lightExercise: "ออกกำลังกายเบาๆ",
          moderateExercise: "ออกกำลังกายปานกลาง",
          heavyExercise: "ออกกำลังกายหนัก",
          veryHeavyExercise: "ออกกำลังกายหนักมาก",
          error: "ข้อผิดพลาด",
          pleaseFilllAllFields: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
          invalidInputValues: "ค่าที่ป้อนไม่ถูกต้อง",
          dataProcessedSuccessfully: "ประมวลผลข้อมูลน้ำหนักและส่วนสูงเรียบร้อยแล้ว!",
          failedToProcessData: "ไม่สามารถประมวลผลข้อมูลน้ำหนักและส่วนสูงได้",
          requestingCameraPermission: "กำลังขอสิทธิ์การเข้าถึงกล้อง...",
          cameraAccessDenied: "ไม่สามารถเข้าถึงกล้องได้",
          barcodeScanner: "สแกนบาร์โค้ด",
          loadingData: "กำลังโหลดข้อมูล...",
          scanBarcodeForFoodInfo: "สแกนบาร์โค้ดเพื่อดูข้อมูลอาหาร",
          noFoodDataFound: "ไม่พบข้อมูลอาหาร",
          errorFetchingData: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          success: "สำเร็จ",
          foodItemAdded: "เพิ่มรายการอาหารลงในแผนมื้ออาหารแล้ว!",
          error: "ข้อผิดพลาด",
          failedToAddFoodItem: "ไม่สามารถเพิ่มรายการอาหารลงในแผนมื้ออาหารได้",
          scanner: "เครื่องสแกน",
          brand: "ยี่ห้อ",
          productName: "ชื่อสินค้า",
          energy: "พลังงาน",
          sugar: "น้ำตาล",
          fat: "ไขมัน",
          protein: "โปรตีน",
          noProductName: "ไม่พบชื่อสินค้า",
          noData: "ไม่พบข้อมูล",
          adding: "กำลังเพิ่ม...",
          addToMeal: "เพิ่มในมื้ออาหาร",
          chatBot: "แชทบอท",
          typeYourMessage: "พิมพ์ข้อความของคุณ...",
          send: "ส่ง",
          profileSetting: "การตั้งค่าโปรไฟล์",
          name: "ชื่อ",
          email: "อีเมล",
          birthdate: "วันเกิด",
          height: "ส่วนสูง (ซม.)",
          weight: "น้ำหนัก (กก.)",
          gender: "เพศ",
          selectGender: "เลือกเพศ",
          saveChanges: "บันทึกการเปลี่ยนแปลง",
          errorFetchingUserData: "ไม่สามารถดึงข้อมูลผู้ใช้ได้",
          profileUpdated: "อัปเดตโปรไฟล์เรียบร้อย!",
          errorUpdatingProfile: "ไม่สามารถอัปเดตโปรไฟล์ได้",
          noDocument: "ไม่มีเอกสารดังกล่าว!"
          
          
        }
      }
    },
    compatibilityJSON: 'v3',
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;