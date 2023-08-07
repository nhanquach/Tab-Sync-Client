import React from "react";
import { ITab } from "../clientApp";
import dayjs from "dayjs";

interface IUrlListProps {
  header: string;
  onClear: (e: React.MouseEvent) => void;
  urls: ITab[];
  isLoading: boolean;
}

const UrlList: React.FC<IUrlListProps> = ({
  header,
  onClear,
  urls,
  isLoading,
}) => {
  return (
    <div className="container" style={{ marginBottom: 40 }}>
      <nav>
        <ul>
          <li>
            <h5 style={{ margin: 0 }}>{header}</h5>
          </li>
        </ul>
        <ul>
          <li>
            <button
              className="outline"
              onClick={onClear}
              style={{ border: 0, padding: "0 10px" }}
              disabled={urls.length === 0}
            >
              Clear
            </button>
          </li>
        </ul>
      </nav>
      {isLoading && <p>Loading...</p>}
      {urls.length === 0 && <p>No Open tab</p>}
      {urls.map((tab) => {
        return (
          <article
            key={tab.id}
            style={{
              display: "flex",
              gap: 10,
              margin: "10px 0",
              padding: 15,
              flexDirection: "column",
            }}
          >
            <a href={tab.url} target="_blank" rel="noreferrer">
              <div
                style={{
                  display: "flex",
                  gap: 15,
                  alignItems: "center",
                }}
              >
                <img src={tab.favIconUrl} height={20} width={20} alt="" />
                {tab.title}
              </div>
            </a>
            <p style={{ margin: "-10px 0 0 35px", fontSize: 14 }}>
              {tab.url}
            </p>
            <p style={{ margin: "0 35px", fontStyle: "italic", fontSize: 14 }}>
              opened on {dayjs(tab.timeStamp).format("DD-MMM-YYYY HH:mm:ss")}
              {!!tab.device ? <span> from {tab.device}</span> : ""}
            </p>
          </article>
        );
      })}
    </div>
  );
};

export default UrlList;
