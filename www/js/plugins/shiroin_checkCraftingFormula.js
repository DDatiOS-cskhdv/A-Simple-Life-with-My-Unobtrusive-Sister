(() => {
    /**
    * @plugindesc 食譜配方合成判斷
    * @author Canaan HS
    * @example
    * 腳本調用
    * $gameMap.checkCraftingFormula() 來獲取合成結果
    */

    /**
     * @description 食譜配方
     * 
     * @example
     * 用法說明:
     * 格式: "名稱 * 數量"
     * 範圍: "Slime * 1~3" (代表放入 1, 2, 或 3 個都符合)
     * 必須: "*Meat" (名稱前加星號，代表必須包含此原料，否則判定失敗)
     * 可選: "Vegetable * 0~1" (代表可以不放，放了也不算錯)
     * 分隔: 不同原料用逗號 "," 隔開
     */
    const craftingRecipe = [
        { id: 239, name: "史萊姆果凍", formula: "Slime" },
        { id: 240, name: "普通咖喱飯", formula: "*CurryBlock, Rice, Vegetable * 0~1" },
        { id: 241, name: "蘋果派", formula: "Apple, Flour * 1~2, Fruit * 1~2" },
        { id: 242, name: "烤蘋果", formula: "Apple * 1~3, Red * 1~2" },
        { id: 243, name: "炒貝類", formula: "Seashell * 1~3" },
        { id: 244, name: "煎魚肉", formula: "Fish * 1~3" },
        { id: 245, name: "炒蘑菇", formula: "Mushroom * 1~3" },
        { id: 246, name: "烤肉串", formula: "*Meat * 1~3, Vegetable, Chilli * 0~1, Potato * 0~1" },
        { id: 247, name: "飯糰", formula: "Rice * 1~3" },
        { id: 248, name: "肉排咖喱", formula: "*Meat, CurryBlock, Rice" },
        { id: 249, name: "煎肉拼盤", formula: "*Meat * 5~6" },
        { id: 250, name: "肉塊湯", formula: "Meat, Vegetable * 0~1" },
        { id: 251, name: "煎大肉排", formula: "*Meat * 3~4" },
        { id: 252, name: "肉飯糰", formula: "Meat * 1~2, Rice * 1~2" },
        { id: 253, name: "奇怪的史萊姆果凍", formula: "Slime * 2~3" },
        { id: 254, name: "奇怪的暗黑史萊姆果凍", formula: "Slime * 1~2, Junk * 1~2" },
        { id: 255, name: "奇怪的粉紅史萊姆果凍", formula: "Slime * 1~2, Red * 1~2" },
        { id: 256, name: "奇怪的彩虹史萊姆果凍", formula: "Slime * 1~2, Ahoge * 1~2" },
        { id: 257, name: "烤香蕉？", formula: "Banana * 1~3" },
        { id: 258, name: "羅宋湯", formula: "Meat * 1~2, Vegetable * 0~1, Potato, Carrot" },
        { id: 259, name: "烤章魚腳", formula: "Octopus * 1~3" },
        { id: 260, name: "蔬菜沙拉", formula: "Vegetable * 3~4" },
        { id: 261, name: "馬鈴薯泥", formula: "Potato * 1~3, Vegetable" },
        { id: 262, name: "蘿蔔菇片湯", formula: "Carrot * 1~2, Mushroom, Vegetable * 0~1" },
        { id: 263, name: "普通意大利麵", formula: "Pasta * 1~3" },
        { id: 264, name: "番茄意麵", formula: "Pasta * 1~2, Tomato * 1~2" },
        { id: 265, name: "海鮮意麵", formula: "Pasta * 1~2, Seashell * 0~1, Seafood * 0~1" },
        { id: 266, name: "雞蛋咖喱飯", formula: "Egg, CurryBlock, Rice, Vegetable * 0~1" },
        { id: 267, name: "蛋包飯", formula: "Egg * 1~2, Rice * 1~2" },
        { id: 268, name: "番茄蛋包飯", formula: "Egg * 1~2, Rice * 1~2, Tomato" },
        { id: 269, name: "海鮮燉飯", formula: "Rice, Seafood * 0~1, Seashell * 0~1" },
        { id: 270, name: "菠蘿飲", formula: "Pineapple * 1~3" },
        { id: 271, name: "沖繩雜炒", formula: "Vegetable * 2~4" },
        { id: 272, name: "炸雞桶", formula: "Chicken * 2~3" },
        { id: 273, name: "炸雞腿", formula: "Chicken * 2" },
        { id: 274, name: "天婦羅飯糰", formula: "Shrimp * 1~2, Rice * 1~2" },
        { id: 275, name: "焗龍蝦", formula: "Lobster * 1~2, Seafood * 0~1" },
        { id: 276, name: "煮螃蟹", formula: "Crab * 1~2, Seafood * 0~1" },
        { id: 277, name: "金槍魚頭", formula: "Maguro * 1~2, Fish * 1~2" },
        { id: 278, name: "章魚丸子", formula: "Octopus * 1~2, Flour * 1~2" },
        { id: 279, name: "漢堡肉", formula: "*Meat * 2, Vegetable * 0~1" },
        { id: 280, name: "辣馬鈴薯泥", formula: "Potato * 1~2, Chilli, Red * 0~1" },
        { id: 281, name: "辣椒水", formula: "Chilli * 1~3, Red * 1~3" },
        { id: 282, name: "水怪軟糖", formula: "Slime * 3~5" },
        { id: 283, name: "黏糊糊刨冰", formula: "Slime * 3~5" },
        { id: 284, name: "水怪軟糖（紅）", formula: "Slime * 2~4, Red * 1~2" },
        { id: 285, name: "煎薄餅", formula: "Flour * 1~3" },
        { id: 286, name: "草莓煎薄餅", formula: "Flour * 1~2, Strawberry * 1~2" },
        { id: 287, name: "番茄湯", formula: "Tomato * 1~3, Red" },
        { id: 288, name: "草莓", formula: "Strawberry * 1~3, Red" },
		{ id: 289, name: "烟熏鸡饭团", formula: "Chicken * 1~2, Rice * 1~2" },
		{ id: 290, name: "鸡肉咖喱饭", formula: "Chicken, CurryBlock, Rice" },
		{ id: 291, name: "烤胡萝卜串", formula: "*Carrot * 2~3, Vegetable* 2~3" },
		{ id: 292, name: "萨卡班甲鱼寿司", formula: "*Rice * 2~3, *SakabanTurtle" },
		{ id: 293, name: "萨卡班甲鱼寿司(虾)", formula: "*Rice, *SakabanTurtle, *Shrimp" },
		{ id: 294, name: "萨卡班甲鱼寿司(肉)", formula: "*Rice, *SakabanTurtle, *Meat" },
		{ id: 295, name: "熔岩烤鸭", formula: "*Chicken * 2, *Chilli, Red" },
        { id: 296, name: "鲨鱼饭团", formula: "*Rice * 1~3, *Fish * 1~2" },
        { id: 297, name: "鲨鱼饭团(烤)", formula: "*Rice * 1~3, *Fish * 1~2" },
    ];

    const preCompiledRecipes = (sourceRecipes) => {
        const regex = /^(\*)?\s*([^*x]+?)\s*(?:[*x]\s*(\d+)(?:~(\d+))?)?$/;
        return sourceRecipes.reduce((acc, { id, name, formula }) => {
            if (!formula) return acc;

            const rules = formula.split(',').map(part => {
                const m = part.trim().match(regex);
                if (!m) return null;

                const min = (m[3] | 0) || 1;
                const max = m[4] ? (m[4] | 0) : min;

                return [
                    m[2].trim(), // Name (String)
                    min,         // Min (Int)
                    max,         // Max (Int)
                    !!m[1]       // Essential (Boolean)
                ];
            }).filter(Boolean);

            if (rules.length) acc.push({ id, name, rules });
            return acc;
        }, []);
    };

    const compiledRecipes = preCompiledRecipes(craftingRecipe);
    const findMostSimilarResult = (ingredientNames) => {
        // 0. 檢查輸入 (防呆)
        if (!ingredientNames || ingredientNames.length === 0) {
            return {
                type: "failing",
                result: compiledRecipes[Math.floor(Math.random() * compiledRecipes.length)].id
            };
        }

        // 1. 預處理輸入
        const inputCounts = {};
        let inputTotalLength = 0;

        for (const name of ingredientNames) {
            inputCounts[name] = (inputCounts[name] || 0) + 1;
            inputTotalLength++;
        }

        let minDiff = Infinity;
        let candidates = [];

        const penaltyPerMissing = 10;

        for (const recipe of compiledRecipes) {
            const { rules } = recipe;
            let diffScore = 0;
            let penaltyScore = 0;

            let matchedInputAmount = 0;

            for (const [name, min, max, isEssential] of rules) {
                const playerHas = inputCounts[name] || 0;

                if (playerHas > 0) {
                    matchedInputAmount += playerHas;
                }

                if (isEssential && playerHas === 0) {
                    penaltyScore += penaltyPerMissing;
                }

                if (playerHas < min) {
                    diffScore += (min - playerHas);
                } else if (playerHas > max) {
                    diffScore += (playerHas - max);
                }
            }

            const impurityCount = inputTotalLength - matchedInputAmount;
            if (impurityCount > 0) {
                diffScore += impurityCount;
            }

            const totalScore = diffScore + penaltyScore;

            if (totalScore < minDiff) {
                minDiff = totalScore;
                candidates = [recipe];
            } else if (totalScore === minDiff) {
                candidates.push(recipe);
            }
        }

        if (candidates.length === 0) {
            const recipe = compiledRecipes[0];
            return { type: "failing", food: recipe.name, result: recipe.id };
        }

        // 3. 匹配率篩選
        const matchingThreshold = 0.5;
        const passedCandidates = [];

        for (const recipe of candidates) {
            const { rules } = recipe;
            let intersection = 0;
            let recipeTotalMin = 0;

            for (const [name, min] of rules) {
                recipeTotalMin += min;
                const playerHas = inputCounts[name] || 0;
                if (playerHas > 0) {
                    intersection += (playerHas < min ? playerHas : min);
                }
            }

            const union = inputTotalLength + recipeTotalMin - intersection;
            const rate = union > 0 ? intersection / union : 0;

            if (rate >= matchingThreshold) {
                passedCandidates.push(recipe);
            }
        }

        const finalPool = passedCandidates.length > 0 ? passedCandidates : candidates;

        // 4. 長度近似度篩選
        let minLenDiff = Infinity;
        let lengthCandidates = [];

        for (const recipe of finalPool) {
            let recipeLen = 0;
            for (const rule of recipe.rules) recipeLen += rule[1];

            const lenDiff = Math.abs(recipeLen - inputTotalLength);
            if (lenDiff < minLenDiff) {
                minLenDiff = lenDiff;
                lengthCandidates = [recipe];
            } else if (lenDiff === minLenDiff) {
                lengthCandidates.push(recipe);
            }
        }

        const finalRecipe = lengthCandidates[
            (lengthCandidates.length * Math.random()) | 0
        ];

        return {
            type: passedCandidates.length > 0 ? "successful" : "failing",
            food: finalRecipe.name,
            result: finalRecipe.id
        };
    };

    Game_Map.prototype.checkCraftingFormula = function (inputSource) {
        let sourceIds = [75, 76, 77];
        let isDirectItemId = false;

        if (Array.isArray(inputSource)) {
            sourceIds = inputSource;
            isDirectItemId = true;
        }

        const ingredients = [];
        const activeItemIds = [];
        const noteRegex = /<Ingredients:\s*(.*?)>/i;

        for (const val of sourceIds) {
            const itemId = isDirectItemId ? val : $gameVariables.value(val);
            if (itemId > 0) {
                const itemData = $dataItems[itemId];
                // 確保物品存在且有標籤
                if (typeof itemData?.note === 'string') {
                    const match = itemData.note.match(noteRegex);
                    if (match && match[1]) {
                        activeItemIds.push(itemId);

                        // 特別處理 字串內有逗號的情況
                        const ingredient = match[1].split(/[,，]/);
                        for (const ing of ingredient) {
                            const ingTrimmed = ing.trim();
                            if (ingTrimmed) ingredients.push(ingTrimmed);
                        }
                    }
                }
            }
        }

        $gameNumberArray.setValue(15, ingredients);
        $gameNumberArray.setValue(16, activeItemIds);

        // findMostSimilarResult 內部已經處理了空陣列的兜底邏輯，直接傳入即可
        return findMostSimilarResult(ingredients);
    };

    Game_Map.prototype.applyItemEffectsFromDish = function (itemIds) {
        const actor = $gameParty.leader(); // 獲取隊長作為目標
        const target = actor;

        if (!Array.isArray(itemIds)) return;

        for (const itemId of itemIds) {
            const item = $dataItems[itemId];
            // 檢查道具有效性
            if (!item || !item.effects || item.effects.length === 0) continue;

            for (let i = 0; i < item.effects.length; i++) {
                const effect = item.effects[i];
                const { code, dataId, value1, value2 } = effect;

                switch (code) {
                    case 11: // Gain HP (恢復體力)
                        if (target.hp < target.mhp) {
                            let hpGain = (value1 * actor.mhp + value2) * actor.pha;
                            hpGain = Math.round(hpGain);
                            target.gainHp(hpGain);
                        }
                        break;

                    case 21: // Add State (添加狀態)
                        const randomVal = Math.random();
                        if (item.scope === 8) { // 全體
                            $gameParty.members().forEach(member => {
                                const rate = value1 * member.stateRate(dataId);
                                if (randomVal < rate) {
                                    member.addState(dataId);
                                }
                            });
                        } else {
                            const rate = value1 * target.stateRate(dataId);
                            if (randomVal < rate) {
                                target.addState(dataId);
                            }
                        }
                        break;

                    case 22: // Remove State
                        if (target.isStateAffected(dataId)) {
                            target.removeState(dataId);
                        } else if (i < 2) {
                            return false;
                        }
                        break;

                    case 44: // Common Event (公共事件)
                        $gameParty._targetActorId = $gameParty.leader()._actorId;
                        $gameMap.steupCEQJ(dataId, 1);
                        break;
                }
            }
        }

        actor.removeState(21);
        actor.removeState(22);
    };
})();

/*:
 * @plugindesc 即兴料理的合成判定
 * @author shiroin
 * @help 通过脚本"$gameMap.checkCraftingFormula()"来判定合成结果
 *
*/

/*
var table = {
    239: ['Slime'],   // 史莱姆果冻
    240: [ ['*CurryBlock', 'Rice'],  
           ['*CurryBlock', 'Rice','Vegetable'] ], // 普通咖喱饭
    241: [ ['Apple', 'Flour','Fruit'],  
           ['Apple', 'Flour','Flour','Fruit','Fruit'] ],  // 苹果派
    242: [ ['Apple','Red'],          
           ['Apple','Apple','Red'],  
           ['Apple','Apple','Apple','Red','Red'] ], // 烤苹果
    243: [ ['Seashell'],  
           ['Seashell','Seashell'],  
           ['Seashell','Seashell','Seashell'] ],  // 炒贝类
    244: [ ['Fish'],  
           ['Fish','Fish'],  
           ['Fish','Fish','Fish'] ],  // 煎鱼肉
    245: [ ['Mushroom'],  
           ['Mushroom','Mushroom'],  
           ['Mushroom','Mushroom','Mushroom'] ],  // 炒蘑菇  
    246: [ ['*Meat','Meat','Vegetable','Chilli'], 
           ['*Meat','Vegetable','Chilli'],
           ['*Meat','Vegetable','Potato'],
           ['*Meat','Meat','Vegetable','Potato'], 
           ['*Meat','Meat','Meat','Vegetable','Potato','Chilli'] ],// 烤肉串    
    247: [ ['Rice'],  
           ['Rice','Rice'],  
           ['Rice','Rice','Rice'] ],  // 饭团
    248: ['*Meat','CurryBlock', 'Rice'], // 肉排咖喱   
    249: [ ['*Meat','Meat','Meat','Meat','Meat'],  
           ['*Meat','Meat','Meat','Meat','Meat','Meat'] ],  // 煎肉拼盘
    250: [ ['Meat'],
           ['Meat','Vegetable'] ],   // 肉块汤
    251: [ ['*Meat','Meat','Meat'],  
           ['*Meat','Meat','Meat','Meat'] ],  // 煎大肉排
    252: [ ['Meat','Rice'],   
           ['Meat','Meat','Rice'],  
           ['Meat','Rice','Rice'] ],  // 肉饭团
    253: [ ['Slime','Slime'],  
           ['Slime','Slime','Slime'] ],  // 奇怪的史莱姆果冻
    254: [ ['Slime','Junk'],  
           ['Slime','Junk','Junk'],  
           ['Slime','Slime','Junk'] ], // 奇怪的暗黑史莱姆果冻
    255: [ ['Slime','Red'],  
           ['Slime','Red','Red'],  
           ['Slime','Slime','Red'] ], // 奇怪的粉红史莱姆果冻
    256: [ ['Slime','Ahoge','Ahoge'],  
           ['Slime','Slime','Ahoge'] ], // 奇怪的彩虹史莱姆果冻
    257: [ ['Banana'],          
           ['Banana','Banana'],  
           ['Banana','Banana','Banana'] ], // 烤香蕉？	   
    258: [  ['Meat','Potato','Carrot'],  
            ['Meat','Meat','Potato','Carrot'],
            ['Meat','Vegetable','Potato','Carrot'] ],  // 罗宋汤 
    259: [ ['Octopus'],
           ['Octopus','Octopus'],  
           ['Octopus','Octopus','Octopus'] ],  // 烤章鱼脚 
    260: [ ['Vegetable','Vegetable','Vegetable'],
           ['Vegetable','Vegetable','Vegetable','Vegetable'] ],  //蔬菜沙拉
    261: [ ['Potato','Vegetable'],          
           ['Potato','Potato','Vegetable'],  
           ['Potato','Potato','Potato','Vegetable'] ], // 土豆泥
    262: [ ['Carrot', 'Mushroom'],     
           ['Carrot','Carrot', 'Mushroom','Vegetable'] ], // 萝卜菇片汤   	  
    263: [ ['Pasta'],  
           ['Pasta','Pasta'],  
           ['Pasta','Pasta','Pasta'] ],  // 普通意大利面
    264: [ ['Pasta','Tomato'],  
           ['Pasta','Pasta','Tomato'],  
           ['Pasta','Tomato','Tomato'] ],  // 番茄意面
    265: [ ['Pasta','Seashell'],  
           ['Pasta','Pasta','Seashell'],
           ['Pasta','Pasta','Seafood'],
           ['Pasta','Seafood','Seashell'] ],  // 海鲜意面		   
    266: [ ['Egg','CurryBlock', 'Rice'],  
           ['Egg','CurryBlock', 'Rice','Vegetable'] ],  // 鸡蛋咖喱饭		   
    267: [ ['Egg', 'Rice'],  
           ['Egg','Egg', 'Rice'],
           ['Egg','Rice', 'Rice'] ],  // 蛋包饭		
    268: [ ['Egg', 'Rice','Tomato'],  
           ['Egg','Egg', 'Rice','Tomato'],
           ['Egg','Rice', 'Rice','Tomato'] ],  // 番茄蛋包饭		
    269: [ ['Seashell', 'Rice'],  
           ['Seafood', 'Rice'],
           ['Seafood','Seashell','Rice'] ],  // 海鲜炖饭		
    270: [ ['Pineapple'],  
           ['Pineapple','Pineapple'],  
           ['Pineapple','Pineapple','Pineapple'] ],  // 菠萝饮		   
    271: [ ['Vegetable','Vegetable'],
           ['Vegetable','Vegetable','Vegetable'],
           ['Vegetable','Vegetable','Vegetable','Vegetable'] ],  //冲绳杂炒
    272: [ ['Chicken','Chicken'],  
           ['Chicken','Chicken','Chicken'] ], // 炸鸡桶		   
    273: [ ['Chicken','Chicken'] ],   // 炸鸡腿		
    274: [ ['Shrimp','Rice'],   
           ['Shrimp','Shrimp','Rice'],  
           ['Shrimp','Rice','Rice'] ],  // 天妇罗饭团	
    275: [ ['Lobster'],   
           ['Lobster','Lobster',],  
           ['Lobster','Lobster','Seafood'] ],  // 焗龙虾
    276: [ ['Crab'],   
           ['Crab','Crab',],  
           ['Crab','Crab','Seafood'] ],  // 煮螃蟹	 
    277: [ ['Maguro','Fish'],   
           ['Maguro','Maguro','Fish','Fish'] ],    // 金枪鱼头	
    278: [ ['Octopus','Flour'],   
           ['Octopus','Octopus','Flour'],
           ['Octopus','Flour','Flour'] ],    // 章鱼丸子		
    279: [ ['*Meat','Meat'],
           ['*Meat','Meat','Vegetable'] ],	// 汉堡肉 	   
    280: [ ['Potato','Chilli','Red'],  
           ['Potato','Chilli'],  
           ['Potato','Potato','Chilli'] ], // 辣土豆泥
    281: [ ['Chilli','Red'],
           ['Chilli','Chilli','Chilli','Red','Red','Red'] ],   // 辣椒水		
    282: [ ['Slime','Slime','Slime'],  
           ['Slime','Slime','Slime','Slime'],
           ['Slime','Slime','Slime','Slime','Slime']],  // 水怪软糖
    283: [ ['Slime','Slime','Slime'],  
           ['Slime','Slime','Slime','Slime'],
           ['Slime','Slime','Slime','Slime','Slime']],  // 黏糊糊刨冰	
    284: [ ['Slime','Slime','Red','Red'],  
           ['Slime','Slime','Slime','Slime','Red'] ], // 水怪软糖（红）
    285: [ ['Flour'],
           ['Flour', 'Flour'],  
           ['Flour', 'Flour','Flour'] ],  // 煎薄饼   
    286: [ ['Flour', 'Strawberry'],  
           ['Flour', 'Flour','Strawberry'],
           ['Flour', 'Flour','Strawberry','Strawberry'] ],// 草莓煎薄饼 	
    287: [ ['Tomato','Red'],
           ['Tomato', 'Tomato','Red'],  
           ['Tomato', 'Tomato','Tomato','Red'] ],  // 番茄汤	
    288: [ ['Strawberry','Red'],
           ['Strawberry', 'Strawberry','Red'],  
           ['Strawberry', 'Strawberry','Strawberry','Red'] ],  // 草莓	   
};

var table2 = createTable2(table);

// 构建有效食材的集合
let validElementsSet = new Set();
for (let key in table) {
    if (table.hasOwnProperty(key)) {
        let value = table[key];
        // 检查是否是嵌套数组
        if (Array.isArray(value[0])) {
            // 处理多个配方的情况
            for (let recipe of value) {
                for (let item of recipe) {
                    validElementsSet.add(item);
                }
            }
        } else {
            // 单个配方
            for (let item of value) {
                validElementsSet.add(item);
            }
        }
    }
}

function createTable2(table) {
    let table2 = {};
    for (let key in table) {
        if (table.hasOwnProperty(key)) {
            let value = table[key];
            let newKey;
            if (Array.isArray(value[0])) {
                // 处理多个配方
                for (let recipe of value) {
                    let sortedArray = recipe.slice().sort();
                    newKey = sortedArray.join(',');
                    if (!table2[newKey]) {
                        table2[newKey] = [];
                    }
                    table2[newKey].push(parseInt(key));
                }
            } else {
                let sortedArray = value.slice().sort();
                newKey = sortedArray.join(',');
                if (!table2[newKey]) {
                    table2[newKey] = [];
                }
                table2[newKey].push(parseInt(key));
            }
        }
    }
    return table2;
}


function calculateSimilarity(target, key) {
    // 将中文逗号替换成英文逗号，并拆分、修剪
    target = target.replace(/，/g, ',');
    key = key.replace(/，/g, ',');
    let targetItems = target.split(',').map(item => item.trim());
    let keyItems = key.split(',').map(item => item.trim());
    
    // 分离必需食材（带 "*" 的项）和普通食材
    let requiredIngredients = [];
    let normalizedKeyItems = [];
    keyItems.forEach(function(item) {
        if (item.startsWith('*')) {
            requiredIngredients.push(item.slice(1));
            normalizedKeyItems.push(item.slice(1));
        } else {
            normalizedKeyItems.push(item);
        }
    });

    // 为必需食材缺失计算额外惩罚：例如每缺少一个必需食材，增加 10 分惩罚（数值可调）
    let penaltyPerMissing = 10;
    let totalPenalty = 0;
    for (let req of requiredIngredients) {
        if (!targetItems.includes(req)) {
            totalPenalty += penaltyPerMissing;
        }
    }

    // 计算普通匹配分：比较 targetItems 与 normalizedKeyItems 的数量差异
    let targetCounts = getCounts(targetItems);
    let keyCounts = getCounts(normalizedKeyItems);
    let diffCount = 0;
    let allItems = new Set([...Object.keys(targetCounts), ...Object.keys(keyCounts)]);
    allItems.forEach(function(item) {
        let tCount = targetCounts[item] || 0;
        let kCount = keyCounts[item] || 0;
        diffCount += Math.abs(tCount - kCount);
    });

    return diffCount + totalPenalty;
}

function getCounts(items) {
    let counts = {};
    items.forEach(function(item) {
        counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
}


function findMostSimilarKey(target) {
    // 将中文逗号替换为英文逗号
    target = target.replace(/，/g, ',');

    // 分割原始输入食材（包括无效食材）
    let targetItems = target.split(",");

    // 构建原始输入的唯一食材集合（包括无效食材）
    let targetUniqueItems = new Set(targetItems);

    // 过滤掉无效的食材，获取有效的输入食材
    let validTargetItems = targetItems.filter(item => validElementsSet.has(item));

    // 如果过滤后没有有效的食材，返回 0
    if (validTargetItems.length === 0) return 3;

    // 构建有效输入食材的集合
    let validTargetUniqueItems = new Set(validTargetItems);

    let minDiff = Infinity;
    let candidateKeys = [];

    for (let key in table2) {
        let keyNormalized = key.replace(/，/g, ',');

        let diff = calculateSimilarity(validTargetItems.join(','), keyNormalized);

        if (diff < minDiff) {
            minDiff = diff;
            candidateKeys = [key];
        } else if (diff === minDiff) {
            candidateKeys.push(key);
        }
    }

    if (candidateKeys.length === 0) return 3;

    // 设定匹配率阈值
    const matchingThreshold = 0.5; // 可以根据需要调整阈值

    // 根据匹配率过滤候选配方
    let filteredCandidates = [];

    for (let key of candidateKeys) {
        let keyItems = key.split(",");
        let keyUniqueItems = new Set(keyItems);

        // 计算有效输入食材与配方食材的交集
        let matchingIngredientsSet = new Set([...validTargetUniqueItems].filter(item => keyUniqueItems.has(item)));
        let matchingIngredients = matchingIngredientsSet.size;

        // 计算输入食材与配方食材的并集
        let unionSet = new Set([...targetUniqueItems, ...keyUniqueItems]);
        let unionSize = unionSet.size;

        // 计算匹配率（使用 Jaccard 相似系数）
        let matchingRate = matchingIngredients / unionSize;

        if (matchingRate >= matchingThreshold) {
            filteredCandidates.push(key);
        }
    }

    if (filteredCandidates.length === 0) return 3;

    // 在匹配率合格的配方中，选择与有效输入食材数量最接近的配方
    let targetLength = validTargetItems.length;
    let minLengthDiff = Infinity;
    let closestKeysByLength = [];

    for (let key of filteredCandidates) {
        let keyItems = key.split(",");
        let lengthDiff = Math.abs(keyItems.length - targetLength);

        if (lengthDiff < minLengthDiff) {
            minLengthDiff = lengthDiff;
            closestKeysByLength = [key];
        } else if (lengthDiff === minLengthDiff) {
            closestKeysByLength.push(key);
        }
    }

    // 如果有多个配方，随机选择一个
    let finalKey;
    if (closestKeysByLength.length > 1) {
        finalKey = closestKeysByLength[Math.floor(Math.random() * closestKeysByLength.length)];
    } else {
        finalKey = closestKeysByLength[0];
    }
    // 从 table2[finalKey] 数组中随机选择一个料理 ID
    let candidates = table2[finalKey];
    if (!candidates || candidates.length === 0) return 3; // 默认值
    let chosenId = candidates[Math.floor(Math.random() * candidates.length)];
    return chosenId;
};

// 按候选key集合，选出“长度最接近”的key，再从其料理ID中随机取一个
function _pickIdFromKeys(keys, targetLen) {
  if (!keys || !keys.length) return null;
  let best = [], bestScore = Infinity;
  for (const k of keys) {
    const len = k.split(",").length;
    // 有目标长度就比 |len - targetLen|；没有有效食材时倾向更“短”的配方
    const score = (targetLen > 0) ? Math.abs(len - targetLen) : len;
    if (score < bestScore) { bestScore = score; best = [k]; }
    else if (score === bestScore) best.push(k);
  }
  const key = best[Math.floor(Math.random() * best.length)];
  const ids = table2[key] || [];
  if (!ids.length) return null;
  return ids[Math.floor(Math.random() * ids.length)];
}

// 新：返回 { type: "successful"|"failing", result: <dishId> }
function findMostSimilarResult(target) {
  target = String(target || "").replace(/，/g, ",");
  const rawItems = target.split(",").map(s => s.trim()).filter(Boolean);

  // 有效食材集合（只用于匹配率计算与长度对齐）
  const validItems = rawItems.filter(it => validElementsSet.has(it));
  const validSet   = new Set(validItems);
  const validLen   = validItems.length;

  // 1) 先用“数量差异 + 必需项惩罚”的 calculateSimilarity 在全库里找“差异最小”的一组候选
  let minDiff = Infinity, candidateKeys = [];
  const baseItems = (validLen > 0 ? validItems : rawItems); // 没有效食材也照样比（分母里会体现）
  for (const key in table2) {
    const diff = calculateSimilarity(baseItems.join(","), key);
    if (diff < minDiff) { minDiff = diff; candidateKeys = [key]; }
    else if (diff === minDiff) candidateKeys.push(key);
  }
  if (candidateKeys.length === 0) {
    // 理论不会发生；兜底：从全库长度最短的配方挑一个
    const anyKey = _pickIdFromKeys(Object.keys(table2), 0);
    return { type: "failing", result: anyKey || 0 };
  }

  // 2) 用 Jaccard 匹配率做“成功/失败”分水岭
  const TH = 0.5;   // 你原来的阈值
  const passed = [];
  for (const key of candidateKeys) {
    const keyItems = key.split(",");
    const inter = keyItems.filter(x => validSet.has(x)).length;
    const union = new Set([...rawItems, ...keyItems]).size;
    const rate = union > 0 ? inter / union : 0;
    if (rate >= TH) passed.push(key);
  }

  // 3) 无论成功/失败，都从“最接近”的集合里按长度相近度挑一个料理ID
  const pool = (passed.length > 0 ? passed : candidateKeys);
  const id = _pickIdFromKeys(pool, validLen);
  return { type: (passed.length > 0 ? "successful" : "failing"), result: id ?? 0 };
}



Game_Map.prototype.checkCraftingFormula = function(itemArray) {
    // 要读取的食材槽列表
    let varIds = [75, 76, 77];
    if (itemArray) varIds = itemArray;
    const ingredients = [];
    const itemIds = [];

    varIds.forEach(varId => {
        let itemId = $gameVariables.value(varId);
        if (itemArray) itemId = varId;
        // 先确保对应食材槽放了食材
        if (itemId > 0) {
            const dataItem = $dataItems[itemId];
            // 再确保食材标签存在
            if (dataItem && typeof dataItem.note === 'string') {
                const match = dataItem.note.match(/<Ingredients:\s*(.*?)>/i);
                if (match && match[1]) {
                    ingredients.push(match[1]);
                    itemIds.push(itemId);
                }
            }
        }
    });

    $gameNumberArray.setValue(15, ingredients);
    $gameNumberArray.setValue(16, itemIds);


  const formula = ingredients.join(",");
  if (!formula) {
    // 无投料：视为 failing，但仍按“最短/最接近的配方”挑一个
    const id = _pickIdFromKeys(Object.keys(table2), 0) || 0;
    return { type: "failing", result: id };
  }
  return findMostSimilarResult(formula);
};



Game_Map.prototype.applyItemEffectsFromDish = function(itemIds) {
    var actor = $gameParty.leader(); // 直接获取队伍领队作为目标
    var target = actor;

    for (var itemIndex = 0; itemIndex < itemIds.length; itemIndex++) {
        var item = $dataItems[itemIds[itemIndex]];
        if (!item || !item.effects || item.effects.length === 0) continue; // 检查道具是否存在以及是否有效果

        var effects = item.effects; // 获取该道具的效果列表

        for (var i = 0; i < effects.length; i++) {
            var effect = effects[i];
            var code = effect.code;
            var dataId = effect.dataId;
            var value1 = effect.value1;
            var value2 = effect.value2;

            switch (code) {
                case 11: // gain HP
                    //if (i < 2) {  return false; }
                    if (target.hp < target.mhp) {
                        var hpGain = (value1 * actor.mhp + value2) * actor.pha;
                        hpGain = Math.round(hpGain);
                        target.gainHp(hpGain);
                    }
                    break;

                case 21: // add state
      if (item.scope === 8) {
          var random = Math.random();
          $gameParty.members().forEach(function(member) {
              var stateSuccessRate = value1 * member.stateRate(dataId); // 根据角色状态有效度调整成功率
              console.log(stateSuccessRate);
              if (random < stateSuccessRate) {
                  member.addState(dataId);

              }
          });
      } else {
          var random = Math.random();
          var stateSuccessRate = value1 * target.stateRate(dataId); // 根据角色状态有效度调整成功率
          if (random < stateSuccessRate) {
              target.addState(dataId);
          }
      }
      break;

                case 22: // remove state
                    if (target.isStateAffected(dataId)) {
                        target.removeState(dataId);
                    } else if (i < 2) {
                        return false;
                    }
                    break;

                case 44: // common event
                    $gameParty._targetActorId = $gameParty.leader()._actorId;                   
                    $gameMap.steupCEQJ(dataId,1);
                    break;

            }
        }
    }
    actor.removeState(21);	
    actor.removeState(22);
}
*/