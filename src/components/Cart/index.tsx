import { FlatList, TouchableOpacity } from "react-native";
import { CartItem } from "../../types/CartItem";
import { Product } from "../../types/Product";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";
import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { useState } from 'react'
import { OrderConfirmedModal } from "../OrderConfirmedModal"
import { Item, ProductContainer, Actions, Image, QuantityContainer, ProductsDetails, Summary, TotalContainer } from "./styles";
import { api } from "../../utils/api";

interface CartProps {
    cartItems: CartItem[],
    onAdd: (product: Product) => void
    onDecrement: (product: Product) => void
    onConfirmOrder: () => void
    selectedTable: string | false
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable}: CartProps) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // let total = 0 
    // order.products.forEach(({product, quantity}) => {
    //     total += product.price * quantity
    // })

    const total = cartItems.reduce((total, { product, quantity }) => {
        return total + (product.price * quantity)
    }, 0)

    async function handleConfirmOrder() {
        setIsLoading(true)

        const payload = {
            table: selectedTable,
            products: cartItems.map((cartItem) => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity,
            }))
        }
        
        await api.post('/orders', payload)

        setIsLoading(false)
        setIsModalVisible(true)
    }

    function handleOk() {
        onConfirmOrder()
        setIsModalVisible(false)
    }
    

    return(
        <>
            <OrderConfirmedModal 
                visible={isModalVisible}
                onOk={handleOk}    
            />

            {cartItems.length > 0 && (
                <FlatList
                data={cartItems}
                keyExtractor={cartItem => cartItem.product._id}
                showsVerticalScrollIndicator={false}
                style={{ marginBottom: 12, maxHeight: 135}}
                renderItem={({ item: cartItem}) => (
                    <Item>
                        <ProductContainer>
                            <Image 
                                source={{
                                    uri: `http://192.168.0.2:3001/uploads/${cartItem.product.imagePath}`
                                }}
                            />
                            <QuantityContainer>
                                <Text size={14} color="#666">{cartItem.quantity}x</Text>
                            </QuantityContainer>
                            <ProductsDetails>
                                <Text size={14} weight="500">
                                    {cartItem.product.name}
                                </Text>
                                <Text size={14} color="#666" style={{ marginTop: 4}}> 
                                    {formatCurrency(cartItem.product.price)}
                                </Text>
                            </ProductsDetails>
                        </ProductContainer>
                        <Actions>
                            <TouchableOpacity 
                                onPress={() => onAdd(cartItem.product)}
                                style={{ marginRight: 24}}
                            >
                                <PlusCircle />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                                <MinusCircle />
                            </TouchableOpacity>
                        </Actions>
                    </Item>
                )}
                />
            )}
        
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text color="#666">Total</Text>
                            <Text size={20} weight="500">{formatCurrency(total)}</Text>
                        </>
                    ) : (
                        <Text color="#666">Seu carrinho está vazio</Text>
                    )}
                </TotalContainer>
                <Button 
                    onPress={handleConfirmOrder}
                    disabled={cartItems.length === 0}
                    loading={isLoading}
                >
                    Confirmar pedido
                </Button>
            </Summary>
        </>
    )
}