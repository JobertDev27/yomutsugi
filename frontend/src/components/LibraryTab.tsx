import "./libraryTab.css";
import settingImg from "../assets/setting.png";
import sortImg from "../assets/filter.png";

export default function LibraryTab() {
  return (
    <section className="library-tab-cont">
      <div className="tab-cont">
        <ul>
          <li className="tab-page">Default</li>
        </ul>
      </div>
      <div className="util-cont">
        <div>
          <span>Sort By</span>
          <img src={sortImg} alt="" />
        </div>
        <div>
          <span>Settings</span>
          <img src={settingImg} alt="" />
        </div>
      </div>
    </section>
  );
}
