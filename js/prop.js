/*
let platforms = ["Thailand", "Indonesia", "Vietnam"];
let envInfo = [["Dev", "Dev2", "Test"], ["Dev", "Test11"], ["Dev", "Test"]];
 */
async function getPropList() {


    async function getRedisConfig() {
        return await get("/get_prop_list", {}, {});
    }


}

function GetPropList() {

    // 假设从服务端获取的数据是 data 变量
    const data = [
        { id: 1, name: 'VIP', other_info: '-' },
        { id: 2, name: '筹码', other_info: '-' },
        { id: 4, name: '经验', other_info: '-' },
        { id: 13, name: '秤砣', other_info: '-' },
        { id: 28, name: '改名卡', other_info: '-' },
        { id: 102, name: 'Domino通行证标识', other_info: '-' },
        { id: 103, name: 'Domino通行证等级', other_info: '-' },
        { id: 118, name: '等级线', other_info: '-' },
    ];

    // 获取表格容器元素
    const tableContainer = document.getElementById('table-container');

    // 创建表格元素
    const table = document.createElement('table');
    table.id = 'myTable';

    // 创建表头
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    [ 'ID','Name', 'OtherInfo'].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // 创建表格主体
    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.other_info}</td>
    `;
        tbody.appendChild(row);
    });
    table.appendChild(tbody);

    // 将表格插入到容器中
    tableContainer.appendChild(table);
}

