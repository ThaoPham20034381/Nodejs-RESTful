const formAddStudent = document.querySelector(".formSubmit");
const formUpdateStudent = document.querySelector(".formUpdate");
const infoStudent = document.querySelector(".infoStudent");
const studentFind = document.querySelector(".studentfind");
const findStudent = document.querySelector(".findStudent");

// form thêm sản phẩm
formAddStudent.addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = this.elements["name"].value;
  const mssv = this.elements["mssv"].value;
  await addStudent(name, mssv);
  await getAllStudent();
  document.querySelector(".studentfind").style.display = "none";
});

// form update sản phẩm
formUpdateProduct.addEventListener("submit", async function (e) {
  e.preventDefault();
  const productId = document.querySelector('input[name="productId"]').value;
  const productName = document.querySelector('input[name="nameUpdate"]').value;
  const NSX = document.querySelector('input[name="NSXUpdate"]').value;
  const HSD = document.querySelector('input[name="HSDUpdate"]').value;
  await updateProduct(productId, productName, NSX, HSD);
  clearForm();
});

findProduct.addEventListener("submit", function (e) {
  e.preventDefault();
  const findName = this.elements["textFindProduct"].value;
  findDataProduct(findName);
});

// tìm kiếm sản phẩm theo tên sản phẩm
const findDataProduct = async (findName) => {
  const res = await axios.get(`http://localhost:4000/product/${findName}`);
  if (res) {
    const product = res.data.product;
    let tableHTML = '<table border="1">';
    tableHTML += "<h1>Thông tin tìm kiếm </h1>";
    tableHTML += "<thead>";
    tableHTML += "<tr>";
    tableHTML += "<th>Tên</th>";
    tableHTML += "<th>NSX</th>";
    tableHTML += "<th>HSD</th>";

    tableHTML += "</tr>";
    tableHTML += "</thead>";
    tableHTML += "<tbody>";

    product.forEach((item) => {
      tableHTML += "<tr>";
      tableHTML += `<td>${item.name}</td>`;
      tableHTML += `<td>${item.NSX}</td>`;
      tableHTML += `<td>${item.HSD}</td>`;
      tableHTML += "</tr>";
    });
    productFind.innerHTML = tableHTML;
    clearForm();
  }
};

//thêm sản phẩm
const addStudent = async (name, mssv) => {
  const res = await axios.post("http://localhost:3000/api/create-user", {
    name: name,
    mssv: mssv,
  });
  if (res) {
    clearForm();
  }
};

// hiển thị tất cả sản phẩm
const getAllStudent = async () => {
  const res = await axios.get("http://localhost:3000/api/users");
  if (res) {
    const students = res.data.sv;
    let tableHTML = '<table border="1">';
    tableHTML += "<h1>Thông tin sinh viên</h1>";
    tableHTML += "<thead>";
    tableHTML += "<tr>";
    tableHTML += "<th>Tên</th>";
    tableHTML += "<th>MSSV</th>";
    tableHTML += "<th></th>";
    tableHTML += "<th></th>";
    tableHTML += "</tr>";
    tableHTML += "</thead>";
    tableHTML += "<tbody>";

    students.forEach((item) => {
      tableHTML += "<tr>";
      tableHTML += `<td>${item.name}</td>`;
      tableHTML += `<td>${item.mssv}</td>`;
      tableHTML += `<td><button onclick="deleteStudent('${item._id}')">Xóa</button></td>`;
      tableHTML += `<td><button onclick = "updateStudent('${item._id}', '${item.name}', '${item.mssv}')">Sửa</button></td>`;
      tableHTML += "</tr>";
    });
    infoStudent.innerHTML = tableHTML;
  }
};

// xóa sản phẩm
const deleteStudent = async (studentId) => {
  const remove = await axios.delete(
    `http://localhost:3000/api/delete-user/${studentId}`
  );
  if (remove) {
    await getAllStudent();
  }
};
// sửa và cập nhật sản phẩm
const updateProduct = async (studentId, name, mssv) => {
  document.querySelector('input[name="nameUpdate"]').value = name;
  document.querySelector('input[name="mssvUpdate"]').value = mssv;
  document.querySelector('input[name="studentId"]').value = studentId;
  const res = await axios.put(`http://localhost:3000/api/update-user/${studentId}`, {
    name: name,
    mssv: mssv,
  });
  if (res) {
    await getAllStudent();
  }
};

// clear form
const clearForm = () => {
  document.querySelector('input[name="name"]').value = "";
  document.querySelector('input[name="mssv"]').value = "";
  document.querySelector('input[name="textFindStudent"]').value = "";
  document.querySelector('input[name="nameUpdate"]').value = "";
  document.querySelector('input[name="mssvUpdate"]').value = "";
};
window.addEventListener("load", getAllStudent);
