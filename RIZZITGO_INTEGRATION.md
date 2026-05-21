# Guia de Integração - API Rizzitgo

## 📌 O que a API Rizzitgo precisa fornecer

### 1. **Endpoint de Categorias**
```
GET /api/categories
Response:
{
  "categories": [
    { "id": "1", "name": "Best Batches" },
    { "id": "2", name: "Accessories" },
    ...
  ]
}
```

### 2. **Endpoint de Produtos**
```
GET /api/products?category=Accessories&search=bag&page=1&limit=12
Response:
{
  "products": [
    {
      "id": "prod_123",
      "name": "Designer Bag",
      "price": 45.99,
      "currency": "€",
      "image": "https://example.com/image.jpg",
      "category": "Accessories",
      "seller": "Taobao"
    },
    ...
  ],
  "total": 120,
  "page": 1,
  "limit": 12
}
```

---

## 🔧 Como Integrar (Passo a Passo)

### Passo 1: Criar a API Route no Next.js
Crie o arquivo: `app/api/products/route.ts`

```typescript
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '12';

  try {
    // Chamar a API da Rizzitgo aqui
    const response = await fetch('https://api.rizzitgo.com/products', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer YOUR_API_KEY`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        search,
        page,
        limit,
      }),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

### Passo 2: Atualizar a Página de Produtos
Descomenta a chamada da API em `/app/products/page.tsx`:

```typescript
// Descomenta isto:
const response = await fetch(
  `/api/products?category=${selectedCategory || ''}&search=${searchTerm}`
);
const data = await response.json();
setProducts(data.products);

// Comenta isto:
// let filtered = MOCK_PRODUCTS;
```

### Passo 3: Configurar Variáveis de Ambiente
Adiciona a `.env.local`:
```
NEXT_PUBLIC_RIZZITGO_API_URL=https://api.rizzitgo.com
RIZZITGO_API_KEY=seu_chave_aqui
```

### Passo 4: Atualizar next.config.ts para a API Rizzitgo
```typescript
const nextConfig = {
  images: {
    domains: ["i.imgur.com", "api.rizzitgo.com", "cdn.rizzitgo.com"],
  },
};
```

---

## 📁 Estrutura de Ficheiros Criada

```
app/
├── products/
│   └── page.tsx (página principal de produtos)
├── api/
│   └── products/
│       └── route.ts (a criar - proxy para Rizzitgo)
├── components/
│   ├── SearchBar.tsx (✅ criado)
│   ├── CategoryTags.tsx (✅ criado)
│   └── ProductGridProducts.tsx (✅ criado)
```

---

## 🎨 Features Implementadas

✅ **Barra de Pesquisa** - Filtra produtos em tempo real  
✅ **Tags de Categorias** - Clica para filtrar por categoria  
✅ **Grid de Produtos** - Apresentação responsiva  
✅ **Mock Data** - Para testes sem API  
✅ **Estados de Carregamento** - UX melhorada  

---

## 🚀 Próximos Passos

1. **Obter credenciais da API Rizzitgo**
2. **Criar `app/api/products/route.ts`**
3. **Testar com dados reais**
4. **Adicionar paginação** (se necessário)
5. **Melhorar performance** com caching/revalidation
