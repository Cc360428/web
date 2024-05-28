function selectPlatform() {
  const platforms = ["Thailand", "Indonesia", "Vietnam", "Malaysia", "Brazil"];
  const envInfo = ["dev", "test", "uat", "pro"];

  const platformSelect = document.getElementById("platformId");
  const envSelect = document.getElementById("envId");

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
      envInfo.forEach((env) => {
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
  console.log("inputId---", inputId);

  // 获取输入框的值
  const inputValue = document.getElementById(inputId);
  const getValue = inputValue.value.trim();

  // 检查输入是否为空
  if (getValue === "") {
    // 输入为空,不需要进行验证
    return true;
  }

  // 检查输入是否只包含数字
  if (!/^\d+$/.test(getValue)) {
    alert("必须是数字");
    inputValue.value = ""; // 清空输入框
    return false; // 验证失败
  }

  if (inputId == "vip" && getValue > 30) {
    alert("vip 不能超过30");
    inputValue.value = ""; // 清空输入框
    return false;
  }

  return true; // 验证成功
}
