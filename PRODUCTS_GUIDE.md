# 📦 Como Adicionar Produtos na NexaFinds

## Estrutura de um Produto

Cada produto tem esta estrutura:

```typescript
{
  id: "prod_1",                        // ID único
  name: "Product Name",                // Nome do produto
  price: 45,                           // Preço em €
  currency: "€",                       // Moeda
  image: "https://url-da-imagem.jpg", // URL da imagem
  category: "Shoes",                   // Categoria
  seller: "Taobao",                    // Vendedor (Taobao/Weidian/Agent)
  link: "https://taobao.com/..."      // Link clicável (NOVO)
}
```

---

## 1️⃣ Página Principal - Produtos em Destaque

### Ficheiro: `/app/page.tsx`

```javascript
const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Classic Sneakers",
    price: 45,
    currency: "€",
    seller: "Taobao",
    image: "https://i.imgur.com/RxCmWDb.jpg",  // ← ADICIONA AQUI A URL DA IMAGEM
    link: "https://taobao.com/...",             // ← ADICIONA AQUI O LINK
  },
  // Adiciona mais produtos...
];
```

### Como obter a URL da imagem:
1. **Imgur** (Recomendado - gratuito):
   - Vai para https://imgur.com/upload
   - Upload da imagem
   - Copia a URL (tipo: `https://i.imgur.com/abc123.jpg`)

2. **Diretamente de Taobao/Weidian**:
   - Clica com botão direito na imagem do produto
   - "Copy image link"
   - Cola na propriedade `image`

---

## 2️⃣ Página de Produtos - Grid Completo

### Ficheiro: `/app/products/page.tsx`

```javascript
const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Premium Designer Bag",
    price: 45,
    currency: "€",
    image: "https://i.imgur.com/RxCmWDb.jpg",
    category: "Bags",
    seller: "Taobao",
    link: "https://item.taobao.com/item.htm?id=123456789",
  },
  // Adiciona mais...
];
```

---

## 3️⃣ Card de Produto - Com Link Clicável

Para que o link funcione, atualizamos o componente ProductCard:

### Ficheiro: `/app/components/ProductCard.tsx`

```tsx
export default function ProductCard({ product }: { product: Product }) {
  return (
    <a 
      href={product.link || '#'} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group glass-effect rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 border border-green-500/20 hover:shadow-lg"
    >
      {/* Imagem */}
      <div className="h-48 bg-cover bg-center relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
        />
      </div>

      {/* Informação */}
      <div className="p-4">
        <h3 className="font-black text-lg mb-2">{product.name}</h3>
        <p className="text-2xl font-black gradient-text">€{product.price}</p>
        <button className="mt-4 w-full px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-all">
          View on {product.seller}
        </button>
      </div>
    </a>
  );
}
```

---

## 4️⃣ Carousel de Banners - Mudar Imagens

### Ficheiro: `/app/components/PromoCarousel.tsx`

```javascript
const BANNERS: Banner[] = [
  {
    id: 1,
    image: "blob:https://imgur.com/2361cacc-561b-43e6-96d6-9407eca6f588",
    title: "New Arrivals",
    description: "Check out the latest trending products",
    link: "/products",
  },
  {
    id: 2,
    image: "URL_DA_TUA_IMAGEM_2", // ← SUBSTITUI ISTO
    title: "Summer Collection",
    description: "Hot deals on summer essentials",
    link: "/products",
  },
  {
    id: 3,
    image: "URL_DA_TUA_IMAGEM_3", // ← SUBSTITUI ISTO
    title: "Flash Sale",
    description: "Limited time offers",
    link: "/products",
  },
];
```

### Como adicionar novo banner:
1. Obter URL da imagem (1200x400 é ideal)
2. Adicionar objeto ao array:
```javascript
{
  id: 4,
  image: "https://tua-imagem.jpg",
  title: "Seu Título",
  description: "Sua descrição",
  link: "/products",
}
```

---

## 5️⃣ Tipos de Dados - Definição Completa

### Ficheiro: `/app/types/index.ts`

```typescript
export interface Product {
  id: string | number;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  seller: string;
  link?: string;  // ← NOVO
  rating?: number;
  reviews?: number;
  inStock?: boolean;
}

export interface Banner {
  id: number;
  image: string;
  title: string;
  description: string;
  link?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
```

---

## 🎯 Exemplo Prático Completo

### Adicionar um Novo Produto à Página Principal

1. Abre `/app/page.tsx`
2. Encontra o array `FEATURED_PRODUCTS`
3. Adiciona este objeto:

```javascript
{
  id: 9,
  name: "Nike Air Max 90",
  price: 65,
  currency: "€",
  seller: "Taobao",
  image: "https://i.imgur.com/NovaSneaker.jpg",
  link: "https://item.taobao.com/item.htm?id=987654321",
},
```

Pronto! O produto aparece automaticamente.

---

## 🖼️ Onde Encontrar Imagens Boas

1. **Imgur** - Upload direto, URLs permanentes
2. **Unsplash** - Imagens livres (para banners)
3. **Taobao/Weidian** - URLs do próprio site
4. **Amazon** - Imagens de produtos
5. **Google Images** - Usar com cuidado (direitos de autor)

---

## ⚡ Dicas Rápidas

### ✅ Bom:
```javascript
image: "https://i.imgur.com/abc123def456.jpg",  // ← URL permanente
link: "https://item.taobao.com/item.htm?id=123",  // ← Link completo
```

### ❌ Evitar:
```javascript
image: "C:/Users/user/photo.jpg",  // ← Path local (não funciona)
link: "taobao.com",                 // ← URL incompleta
```

---

## 📱 Responsive Images

As imagens aparecem bem em:
- **Desktop**: 300px de altura
- **Tablet**: 250px de altura  
- **Mobile**: 200px de altura

Use imagens **1:1 (quadradas)** ou **4:3** para melhor resultado.

---

## 🔗 API Backend (Futuro)

Quando tiveres backend, podes ter uma database:

```javascript
// POST /api/products
{
  name: "Product Name",
  price: 45,
  image: "upload",  // Upload direto
  category: "Shoes",
  seller: "Taobao",
  link: "https://...",
}
```

---

## 📞 Resumo Rápido

| Onde Adicionar | Ficheiro | Campo |
|---|---|---|
| Página Principal | `/app/page.tsx` | `FEATURED_PRODUCTS` |
| Página Produtos | `/app/products/page.tsx` | `MOCK_PRODUCTS` |
| Banners | `/app/components/PromoCarousel.tsx` | `BANNERS` |
| Categorias | `/app/products/page.tsx` | `CATEGORIES` |

Já tá! 🎉
