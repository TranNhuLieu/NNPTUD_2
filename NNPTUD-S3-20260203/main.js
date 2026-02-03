async function getData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById('table_body');
        body.innerHTML = '';
        for (const post of posts) {
            const isDeleted = post.isDeleted ? 'style="text-decoration: line-through;"' : '';
            body.innerHTML += `<tr ${isDeleted}>
                <td>${post.id}</td>
                <td>${post.title}</td>
                <td>${post.views}</td>
                <td><input type='submit' value='Delete' onclick='
                Delete(${post.id})'></td>
            </tr>`
        }
    } catch (error) {
        console.log(error);
    }
}
async function Save() {
    let id = document.getElementById('txt_id').value;
    let title = document.getElementById('txt_title').value;
    let views = document.getElementById('txt_views').value;
    let getItem = await fetch('http://localhost:3000/posts/' + id);
    if (getItem.ok) {
        //edit
        let res = await fetch('http://localhost:3000/posts/'+id, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                views: views
            })
        })
        if (res.ok) {
            console.log("thanh cong");
            document.getElementById('txt_id').value = '';
            document.getElementById('txt_title').value = '';
            document.getElementById('txt_views').value = '';
            getData();
        }
    } else {
        //create - tự tăng ID
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let maxId = posts.length > 0 ? Math.max(...posts.map(p => parseInt(p.id))) : 0;
        let newId = (maxId + 1).toString();
        
        let createRes = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: newId,
                title: title,
                views: views,
                isDeleted: false
            })
        })
        if (createRes.ok) {
            console.log("thanh cong");
            document.getElementById('txt_id').value = '';
            document.getElementById('txt_title').value = '';
            document.getElementById('txt_views').value = '';
            getData();
        }
    }
}
async function Delete(id) {
    //Xoá mềm - chỉ cập nhật isDeleted thành true
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            isDeleted: true
        })
    })
    if (res.ok) {
        console.log("xoa thanh cong");
        getData();
    }
}
getData();

