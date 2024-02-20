import React, { useEffect, useState } from "react";
import { Button, Input, Select, notification } from "antd";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import baseUrl from "../api/axios";

const CreatePost = () => {
  const [content, setContent] = useState();
  const [categorys, setCategorys] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const loadCategory = () => {
    baseUrl
      .get(`category`)
      .then((response) => setCategorys(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const handleChangeTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const handleChangeSelect = (value) => {
    setCategoryId(value);
  };

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html }) {
    setContent(html);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title: postTitle,
      post_img: thumbnail,
      category: categoryId,
      content: content,
      created_at: new Date().toLocaleString(),
      update_at: "",
    };
    baseUrl
      .post("posts", newPost)
      .then((res) => {
        if (res.status === 201) {
          notification.success({
            message: "Thành công",
            description: "Thêm mới bài viết thành công",
          });
        }
      })
      .catch((err) => {
        if (err.name === "AxiosError") {
          notification.error({
            message: "Cảnh báo",
            description: "Lỗi hệ thống",
          });
        }
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Tên bài viết</label>
          <Input onChange={handleChangeTitle} value={postTitle} />
        </div>
        <div>
          <label htmlFor="">Hình ảnh</label>
          <Input />
        </div>
        <div>
          <label htmlFor="">Tên danh mục</label>
          <Select
            defaultValue={categorys[0]?.id}
            placeholder={categorys[0]?.category_name}
            style={{
              width: 120,
            }}
            onChange={handleChangeSelect}
            options={categorys?.map((cate) => ({
              value: cate.id,
              label: cate.category_name,
            }))}
          />
        </div>
        <div>
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
          />
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Button htmlType="submit" type="primary">
            Thêm mới
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePost;
