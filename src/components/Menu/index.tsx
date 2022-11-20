import { ProductContainer, ProductsDetails, Image, Separator, AddToCartButton} from './styles'
import { FlatList } from 'react-native'

import { Text } from '../Text'
import { formatCurrency } from '../../utils/formatCurrency'
import { PlusCircle } from '../Icons/PlusCircle'
import { ProductModal } from '../ProductModal'
import { useState } from 'react'
import { Product } from '../../types/Product'

interface MenuProps {
    onAddToCard: (product: Product) => void
    products: Product[]
}

export function Menu({ onAddToCard, products }: MenuProps) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectesProduct, setSelectedProduct] = useState<null | Product>(null)

    function handleOpenModal(product: Product) {
        setIsModalVisible(true)
        setSelectedProduct(product)
    }

    return (
        <>
            <ProductModal  
                visible={isModalVisible} 
                onClose={() => setIsModalVisible(false)}
                product={selectesProduct}
                onAddToCard={onAddToCard}
            />

            <FlatList 
            data={products}
            style={{ marginTop: 32 }}
            ItemSeparatorComponent={Separator}
            contentContainerStyle={{ paddingHorizontal: 24 }}
            keyExtractor={product => product._id}
            renderItem={({ item: product }) => (
                <ProductContainer onPress={() => handleOpenModal(product)}>
                    <Image 
                        source={{
                            uri: `http://192.168.0.2:3001/uploads/${product.imagePath}`
                        }}
                    />

                    <ProductsDetails>
                        <Text weight="500">{product.name}</Text>
                        <Text size={14} color="#666" style={{ marginVertical: 8 }}>{product.description}</Text>
                        <Text size={14} weight="500">{formatCurrency(product.price)}</Text>
                    </ProductsDetails>

                    <AddToCartButton onPress={() => onAddToCard(product)}>
                        <PlusCircle />
                    </AddToCartButton>
                </ProductContainer>
            )}
        />
        </>
    )
}