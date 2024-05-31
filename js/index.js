/*
let platforms = ["Thailand", "Indonesia", "Vietnam"];
let envInfo = [["Dev", "Dev2", "Test"], ["Dev", "Test11"], ["Dev", "Test"]];
 */
async function selectPlatform() {
    let platforms = [];
    let envInfo = [[]];

    async function getRedisConfig() {
        return await get("/get_redis", {}, {});
    }

    try {
        const redisConfig = await getRedisConfig();
        const {Platform, EnvInfo} = redisConfig
        const newPlatform = Platform
        const newEnvInfo = EnvInfo
        platforms = newPlatform
        envInfo = newEnvInfo
    } catch (err) {
        console.error("Error:", err);
    }

    const platformSelect = document.getElementById("platform_id");
    const envSelect = document.getElementById("env_id");

    console.log(platformSelect, envSelect);
    if (!platformSelect || !envSelect) {
        console.error("platformSelect or envSelect is null");
        return;
    }

    // Check if the platform dropdown has already been populated
    if (platformSelect.options.length > 1) {
        return;
    }

    // Populate the platform dropdown
    platforms.forEach((platform) => {
        const option = document.createElement("option");
        option.value = platform;
        option.text = platform;
        platformSelect.add(option);
    });

    // Add event listener to the platform dropdown
    platformSelect.addEventListener("change", () => {
        // Show the environment dropdown
        envSelect.style.display = "inline-block";

        // Clear the environment dropdown
        while (envSelect.options.length > 1) {
            envSelect.remove(1);
        }

        // Populate the environment dropdown based on the selected platform
        const selectedPlatform = platformSelect.value;
        if (selectedPlatform && selectedPlatform !== "default") {
            envInfo[platforms.indexOf(platformSelect.value)].forEach((env) => {
                const option = document.createElement("option");
                option.value = env;
                option.text = env;
                envSelect.add(option);
            });
        } else {
            // Hide the environment dropdown if "Select Platform" is chosen
            envSelect.style.display = "none";
        }
    });
}

function checkDigit(inputId) {

    // 获取输入框的值
    const inputValue = document.getElementById(inputId);
    const getValue = inputValue.value.trim();

    // 检查输入是否为空
    if (getValue === "") {
        // 输入为空,不需要进行验证
        return true;
    }

    // 检查输入是否只包含数字且大于0
    if (!/^\d+$/.test(getValue) || parseInt(getValue) <= 0) {
        alert("输入必须是大于0的数字");
        inputValue.value = ""; // 清空输入框
        return false; // 验证失败
    }

    if (inputId === "vip" && getValue > 30) {
        alert("vip 不能超过30");
        inputValue.value = ""; // 清空输入框
        return false;
    }


    if (inputId === "other_value") {
        console.log(inputId)
        // 获取输入框的值
        const otherId = document.getElementById("other_id");
        const otherIdValue = otherId.value.trim();
        if (parseInt(otherIdValue) === 1 && parseInt(getValue) > 30) {
            alert("other_value 不能大于30");
            return false;
        }
    }

    return true; // 验证成功
}

async function updateRedis(event) {

    event.preventDefault(); // 阻止表单的默认提交行为
    // 将 FormData 转换为 JavaScript 对象
    const formData = Object.fromEntries(new FormData(event.target));
    if (formData.platform_id.trim() === "default" || formData.env_id.trim() === "default") {
        alert("请选择 平台 & 环境")
        return
    }

    if (formData.vip.trim() === "" && formData.chip.trim() === "" && formData.nick.trim() === "" && formData.portrait.trim() === "" && formData.unlock.trim() === "no" && formData.other_id.trim() === "" && formData.other_value.trim() === "") {
        alert("至少修改一项")
        return
    }

    // if (parseInt(formData.vip.trim()) < 0 ||
    //     parseInt(formData.chip.trim()) < 0 ||
    //     parseInt(formData.nick.trim()) < 0 ||
    //     parseInt(formData.portrait.trim()) < 0 ||
    //     parseInt(formData.other_id.trim()) < 0 ||
    //     parseInt(formData.other_value.trim()) < 0) {
    //     alert("不能<0")
    //     return
    // }

    if (formData.other_id.trim() !== "" && formData.other_value.trim() === "") {
        alert("OtherId 有必须OtherValue 也有值")
        return
    }

    console.log("request:", formData);

    try {
        const response = await post("/update_info", formData, {});
        console.log("Redis 更新成功:", response);
        alert("Redis 更新成功!");
    } catch (error) {
        console.error("Redis 更新失败:", error);
        alert("Redis 更新失败!");
    }
}
