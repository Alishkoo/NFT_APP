import React, { useState, useEffect } from "react";

const NFT_ABI = [
  {
    inputs: [
      { internalType: "address", name: "to", type: "address" },
      { internalType: "string", name: "tokenURI_", type: "string" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "nextTokenId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

const contractAddress = "0x93Ec1FABc77D54566C0D96C00E0352961B9b3c67";

function NFTCard({ nft }) {
  const [image, setImage] = useState("");

  // Загружаем JSON и вытаскиваем ссылку на картинку
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(nft.tokenURI);
        const data = await response.json();
        // Делаем абсолютную ссылку для https
        setImage(
          data.image.startsWith("ipfs://")
            ? `https://ipfs.io/ipfs/${data.image.substring(7)}`
            : data.image
        );
      } catch (err) {
        console.error("Error loading JSON:", err);
      }
    };
    fetchImage();
  }, [nft.tokenURI]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        width: "220px",
        backgroundColor: "#fefefe",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
        transition: "transform 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
    >
      {image ? (
        <img
          src={image}
          alt={`NFT #${nft.tokenId}`}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: "#924646ff",
            borderRadius: "8px",
          }}
        />
      )}
      <h3 style={{ margin: "10px 0 5px 0" }}>NFT #{nft.tokenId}</h3>
      <a
        href={nft.tokenURI}
        target="_blank"
        rel="noreferrer"
        style={{ fontSize: "14px", color: "#0070f3" }}
      >
        View JSON
      </a>
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");

  // фильтруем по tokenId
  const filtered = NFTS.filter((nft) =>
    nft.tokenId.toString().includes(search)
  );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        🎓 NFT Certificates Gallery
      </h1>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search by token ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px 15px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "25px",
        }}
      >
        {filtered.map((nft) => (
          <NFTCard key={nft.tokenId} nft={nft} />
        ))}
      </div>
    </div>
  );
}

const NFTS = [
  {
    tokenId: 1,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/1.json",
  },
  {
    tokenId: 2,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/2.json",
  },
  {
    tokenId: 3,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/3.json",
  },
  {
    tokenId: 4,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/4.json",
  },
  {
    tokenId: 5,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/5.json",
  },
  {
    tokenId: 6,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/6.json",
  },
  {
    tokenId: 7,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/7.json",
  },
  {
    tokenId: 8,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/8.json",
  },
  {
    tokenId: 9,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/9.json",
  },
  {
    tokenId: 10,
    tokenURI:
      "https://ipfs.io/ipfs/bafybeieertzmmfm66z6cdue3343ehbg2cb767gzoguk5bjrsm6or2tz4ty/10.json",
  },
];

export default App;
