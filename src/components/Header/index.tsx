import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Container, Content, OrderHeader, Table } from "./styles";

interface HeaderProps {
  selectedTable: false | String;
  onCancelOrder: () => void
}

export function Header({ selectedTable, onCancelOrder }: HeaderProps) {
  return (
    <Container>
      {!selectedTable ? (
        <>
          <Text size={14} opacity={0.9}>
            Bem-vindo(a) ao{" "}
          </Text>
          <Text size={24} weight="600">
            WAITER
            <Text size={24}>APP</Text>
          </Text>
        </>
      ) : (
        <Content>
          <OrderHeader>
            <Text size={24} weight="500">
              Pedidos
            </Text>
            <TouchableOpacity onPress={onCancelOrder}>
              <Text color="#d73035" weight="500" size={14}>
                cancelar pedido
              </Text>
            </TouchableOpacity>
          </OrderHeader>
          <Table>
            <Text color="#666">Mesa {selectedTable}</Text>
          </Table>
        </Content>
      )}
    </Container>
  );
}
