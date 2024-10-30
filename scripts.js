// scripts.js

// 選擇所有必要的元素
const insightList = document.getElementById("insight-list");
const psychologicalDriverSection = document.getElementById("psychological-driver");
const driverText = document.getElementById("driver-text");
const confirmDriverBtn = document.getElementById("confirm-driver-btn");
const strategySection = document.getElementById("strategy-suggestion");
const strategyText = document.getElementById("strategy-text");
const exampleParenting = document.getElementById("example-parenting");
const exampleMarketing = document.getElementById("example-marketing");
const examplePublic = document.getElementById("example-public");
const resetBtn = document.getElementById("reset-btn");

let selectedInsight = "";

// 所有策略和對應的洞察重點、心理驅力和應用範例
const strategies = {
    "attraction": {
        driver: "吸引力、信任",
        strategy: "選擇合適的傳播者來強化訊息的效用。",
        examples: {
            parenting: "請孩子崇拜的運動員或英雄宣傳閱讀和健康習慣。",
            marketing: "利用明星代言來增加護膚品的吸引力。",
            public: "邀請當地名人宣傳環保活動，吸引更多人參加。"
        }
    },
    "ability": {
        driver: "能力感、自信",
        strategy: "設定簡單、明確的小目標，降低行為難度。",
        examples: {
            parenting: "設定小學習目標，例如每天讀10分鐘書。",
            marketing: "在健身App中設置逐步增強的運動挑戰。",
            public: "在健康活動中，設置每週小步驟目標。"
        }
    },
    "natural-cue": {
        driver: "自動化選擇",
        strategy: "設置行為提示線索，讓行為自動發生。",
        examples: {
            parenting: "在家中擺放書籍角，讓孩子隨時可以接觸到閱讀材料。",
            marketing: "在午餐時間推送提醒，用戶可輕鬆點選健康午餐訂單。",
            public: "在公共場所設置步行消耗熱量標識，鼓勵步行。"
        }
    },
    "choice": {
        driver: "自主性、簡單性",
        strategy: "透過選擇設計來引導期望行為。",
        examples: {
            parenting: "給孩子選擇閱讀材料，增強自主學習意願。",
            marketing: "默認選擇環保包裝作為運送方式。",
            public: "提供電子服務選項，讓民眾自然選擇無紙化方式。"
        }
    },
    "competition": {
        driver: "成就感、動機",
        strategy: "引入友好的競爭機制來激勵參與。",
        examples: {
            parenting: "設立家庭閱讀排行榜，鼓勵孩子多閱讀。",
            marketing: "運動App中設置好友競賽，促進互相激勵。",
            public: "社區設置回收比賽，激發居民參與環保行動。"
        }
    },
    "conformity": {
        driver: "從眾心理、歸屬感",
        strategy: "透過社群平台創造跟風行為。",
        examples: {
            parenting: "邀請孩子朋友共同參加活動，增強參與感。",
            marketing: "顯示「熱門產品」標籤，吸引更多人購買。",
            public: "強調「已有上千人參與」，引發從眾心理。"
        }
    },
    "social-recognition": {
        driver: "社會認可",
        strategy: "營造正面社會認可氛圍，讓行為被肯定。",
        examples: {
            parenting: "在家庭聚會中表揚孩子的成就。",
            marketing: "在社群分享客戶見證，增加產品認同度。",
            public: "給予「志願者勳章」表彰社區志願者。"
        }
    },
    "reciprocity": {
        driver: "互惠、情感連結",
        strategy: "透過關懷和贈品創造情感聯結。",
        examples: {
            parenting: "孩子表現好時提供小獎勵，增強互惠關係。",
            marketing: "提供試用品，使顧客感到受到重視。",
            public: "活動中提供免費餐點，增加參與動機。"
        }
    },
    "urgency": {
        driver: "緊迫感",
        strategy: "設置限時優惠或倒數計時，促使快速決策。",
        examples: {
            parenting: "限定遊戲時間，讓孩子學會高效完成。",
            marketing: "限時折扣增加消費者購買意願。",
            public: "活動報名倒數提醒，吸引民眾立即參加。"
        }
    },
    "commitment": {
        driver: "一致性需求、認知失調",
        strategy: "設置逐步承諾機制，逐漸增加行為需求。",
        examples: {
            parenting: "逐步增加學習任務，建立學習習慣。",
            marketing: "設置等級會員制度，吸引用戶持續參與。",
            public: "鼓勵居民先參加小型志願活動，再參加更大活動。"
        }
    },
    "respect": {
        driver: "社會尊重",
        strategy: "設計認可與獎勵機制，使行為被社會尊重。",
        examples: {
            parenting: "家庭活動中讓孩子表達意見，增加自信。",
            marketing: "提供VIP服務，讓顧客感到被尊重。",
            public: "公開表揚志願者，提升自豪感。"
        }
    },
    "value": {
        driver: "價值感、成就感",
        strategy: "具象化行為或產品的心理和金錢價值。",
        examples: {
            parenting: "解釋學習對未來的實際好處。",
            marketing: "以數據展示產品價值，例如節省的成本。",
            public: "數據展示健康檢查的預防效果。"
        }
    },
    "loss-aversion": {
        driver: "損失厭惡",
        strategy: "明確展示不行動的風險，增加行為動機。",
        examples: {
            parenting: "讓孩子知道未完成作業的後果。",
            marketing: "強調「錯過即失」的限量優惠。",
            public: "提醒民眾不定期健康檢查的潛在健康風險。"
        }
    },
    "enjoyment": {
        driver: "好奇心、快樂感",
        strategy: "設計有趣互動，讓行為愉快有趣。",
        examples: {
            parenting: "將學習轉化為遊戲過程，提升學習興趣。",
            marketing: "透過AR試穿功能提升購物體驗。",
            public: "設計互動體驗活動，引發愉悅感。"
        }
    }
};

// 添加事件監聽器以監測洞察重點的點擊
insightList.addEventListener("click", function(event) {
    // 確保點擊的是按鈕
    if (event.target.tagName === "BUTTON") {
        // 獲取選中的洞察重點
        selectedInsight = event.target.getAttribute("data-insight");

        // 確認是否抓取到 data-insight 屬性，並在控制台中顯示
        console.log("選擇的洞察重點:", selectedInsight);

        // 如果有對應的策略，顯示心理驅力
        if (strategies[selectedInsight]) {
            driverText.textContent = strategies[selectedInsight].driver;
            psychologicalDriverSection.style.display = "block"; // 顯示心理驅力區域
            strategySection.style.display = "none"; // 隱藏策略區域（若已顯示）
        } else {
            console.log("未找到對應的策略");
        }
    }
});

// 確認心理驅力並顯示策略建議
confirmDriverBtn.addEventListener("click", function() {
    if (strategies[selectedInsight]) {
        strategyText.textContent = strategies[selectedInsight].strategy;
        exampleParenting.textContent = strategies[selectedInsight].examples.parenting;
        exampleMarketing.textContent = strategies[selectedInsight].examples.marketing;
        examplePublic.textContent = strategies[selectedInsight].examples.public;
        strategySection.style.display = "block"; // 顯示策略建議區域
    }
});

// 重新選擇洞察重點
resetBtn.addEventListener("click", function() {
    psychologicalDriverSection.style.display = "none"; // 隱藏心理驅力區域
    strategySection.style.display = "none"; // 隱藏策略建議區域
});
