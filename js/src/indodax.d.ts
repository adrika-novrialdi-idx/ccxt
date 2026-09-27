import Exchange from './abstract/indodax.js';
import type { Balances, Currency, Dict, Int, Market, Num, OHLCV, Order, OrderBook, OrderSide, OrderType, Str, Strings, Ticker, Tickers, Trade, Transaction, int, DepositAddress, NullableDict, DepositWithdrawFee } from './base/types.js';
/**
 * @class indodax
 * @augments Exchange
 */
export default class indodax extends Exchange {
    describe(): any;
    nonce(): number;
    /**
     * @ignore
     * @method
     * @name indodax#isTapiV2
     * @description whether private calls should use TAPI v2
     * @returns {boolean} true when options.tapiVersion is "2"
     */
    isTapiV2(): boolean;
    /**
     * @ignore
     * @method
     * @name indodax#tapiV2Symbol
     * @description convert a market to the lowercase TAPI v2 symbol
     * @param {object} market market structure
     * @returns {string} exchange symbol such as btcidr
     */
    tapiV2Symbol(market: Market): string;
    /**
     * @method
     * @name indodax#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the exchange server
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md#server-time
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the exchange server
     */
    fetchTime(params?: Dict): Promise<Int>;
    /**
     * @method
     * @name indodax#fetchMarkets
     * @description retrieves data on all markets for indodax
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md#pairs
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    fetchMarkets(params?: Dict): Promise<Market[]>;
    parseBalance(response: any): Balances;
    /**
     * @method
     * @name indodax#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#get-info-endpoint
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-account-information
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.omitZeroBalances] true to omit zero balances, only used when options.tapiVersion is "2"
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/?id=balance-structure}
     */
    fetchBalance(params?: Dict): Promise<Balances>;
    /**
     * @method
     * @name indodax#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md#depth
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order book structure]{@link https://docs.ccxt.com/?id=order-book-structure}
     */
    fetchOrderBook(symbol: string, limit?: Int, params?: Dict): Promise<OrderBook>;
    parseTicker(ticker: Dict, market?: Market): Ticker;
    /**
     * @method
     * @name indodax#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md#ticker
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/?id=ticker-structure}
     */
    fetchTicker(symbol: string, params?: Dict): Promise<Ticker>;
    /**
     * @method
     * @name indodax#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md#ticker-all
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/?id=ticker-structure}
     */
    fetchTickers(symbols?: Strings, params?: Dict): Promise<Tickers>;
    parseTrade(trade: Dict, market?: Market): Trade;
    /**
     * @method
     * @name indodax#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Public-RestAPI.md#trades
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/?id=public-trades}
     */
    fetchTrades(symbol: string, since?: Int, limit?: Int, params?: Dict): Promise<Trade[]>;
    parseOHLCV(ohlcv: any, market?: Market): OHLCV;
    /**
     * @method
     * @name indodax#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest candle to fetch
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    fetchOHLCV(symbol: string, timeframe?: string, since?: Int, limit?: Int, params?: Dict): Promise<OHLCV[]>;
    parseOrderStatus(status: Str): Str;
    parseOrder(order: Dict, market?: Market): Order;
    /**
     * @method
     * @name indodax#fetchOrder
     * @description fetches information on an order made by the user
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#get-order-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-order
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.clientOrderId] client order id, only used when options.tapiVersion is "2"
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    fetchOrder(id: string, symbol?: Str, params?: Dict): Promise<Order>;
    /**
     * @method
     * @name indodax#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#open-orders-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#pending-order
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of  open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/?id=order-structure}
     */
    fetchOpenOrders(symbol?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Order[]>;
    /**
     * @method
     * @name indodax#fetchClosedOrders
     * @description fetches information on multiple closed orders made by the user
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#order-history
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#order-history
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/?id=order-structure}
     */
    fetchClosedOrders(symbol?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Order[]>;
    /**
     * @method
     * @name indodax#createOrder
     * @description create a trade order
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#trade-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#create-order
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type 'market' or 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {float} [params.cost] quote amount to spend on a market buy, only used when options.tapiVersion is "2"
     * @param {string} [params.clientOrderId] client order id, only used when options.tapiVersion is "2"
     * @param {string} [params.timeInForce] GTC or MOC, only used when options.tapiVersion is "2"
     * @param {string} [params.selfTradePreventionMode] EXPIRE_TAKER, EXPIRE_MAKER, or EXPIRE_BOTH, only used when options.tapiVersion is "2"
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    createOrder(symbol: string, type: OrderType, side: OrderSide, amount: number, price?: Num, params?: Dict): Promise<Order>;
    /**
     * @method
     * @name indodax#cancelOrder
     * @description cancels an open order
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#cancel-order-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#cancel-order
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.side] order side, required on TAPI v1 and not used when options.tapiVersion is "2"
     * @param {string} [params.clientOrderId] client order id, only used when options.tapiVersion is "2"
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/?id=order-structure}
     */
    cancelOrder(id: string, symbol?: Str, params?: Dict): Promise<Order>;
    /**
     * @method
     * @name indodax#fetchTransactionFee
     * @description fetch the fee for a transaction
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#withdraw-fee-endpoints
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [fee structure]{@link https://docs.ccxt.com/?id=fee-structure}
     */
    fetchTransactionFee(code: string, params?: Dict): Promise<{
        info: Dict;
        rate: Num;
        currency: Str;
    }>;
    /**
     * @method
     * @name indodax#fetchDepositWithdrawFee
     * @description fetch the withdrawal fee for a currency; indodax charges no crypto deposit fees, see https://github.com/ccxt/ccxt/issues/25800
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#withdraw-fee-endpoints
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [fee structure]{@link https://docs.ccxt.com/?id=fee-structure}
     */
    fetchDepositWithdrawFee(code: string, params?: Dict): Promise<DepositWithdrawFee>;
    /**
     * @method
     * @name indodax#fetchDepositsWithdrawals
     * @description fetch history of deposits and withdrawals
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#transaction-history-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-withdraw-coin-information-history
     * @param {string} [code] unified currency code for the currency of the deposit/withdrawals, default is undefined
     * @param {int} [since] timestamp in ms of the earliest deposit/withdrawal, default is undefined
     * @param {int} [limit] max number of deposit/withdrawals to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [transaction structure]{@link https://docs.ccxt.com/?id=transaction-structure}
     */
    fetchDepositsWithdrawals(code?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Transaction[]>;
    /**
     * @method
     * @name indodax#withdraw
     * @description make a withdrawal
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#withdraw-coin-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#withdraw-coin
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#withdraw-idr
     * @param {string} code unified currency code
     * @param {float} amount the amount to withdraw
     * @param {string} address the address to withdraw to
     * @param {string} tag
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.network] unified network code, used for crypto withdrawals when options.tapiVersion is "2"
     * @param {string} [params.clientOrderId] client request id, only used when options.tapiVersion is "2"
     * @param {string} [params.bankCode] bank code for an IDR withdrawal when options.tapiVersion is "2"
     * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/?id=transaction-structure}
     */
    withdraw(code: string, amount: number, address: string, tag?: Str, params?: Dict): Promise<Transaction>;
    parseTransaction(transaction: Dict, currency?: Currency): Transaction;
    parseTransactionStatus(status: Str): Str;
    /**
     * @method
     * @name indodax#fetchDepositAddresses
     * @description fetch deposit addresses for multiple currencies and chain types
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/Private-RestAPI.md#general-information-on-endpoints
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#list-deposit-address
     * @param {string[]} [codes] list of unified currency codes, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.network] unified network code, only used when options.tapiVersion is "2"
     * @returns {object} a list of [address structures]{@link https://docs.ccxt.com/?id=address-structure}
     */
    fetchDepositAddresses(codes?: Strings, params?: Dict): Promise<DepositAddress[]>;
    /**
     * @ignore
     * @method
     * @name indodax#balanceV2
     * @description query account balances on TAPI v2
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-account-information
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a balance structure
     */
    balanceV2(params?: Dict): Promise<Balances>;
    /**
     * @ignore
     * @method
     * @name indodax#parseBalanceV2
     * @param {object} response account response
     * @returns {object} a balance structure
     */
    parseBalanceV2(response: Dict): Balances;
    /**
     * @ignore
     * @method
     * @name indodax#parseV2Order
     * @param {object} order raw order
     * @param {object} [market] market structure
     * @returns {object} an order structure
     */
    parseV2Order(order: Dict, market?: Market): Order;
    /**
     * @ignore
     * @method
     * @name indodax#parseV2Trade
     * @param {object} trade raw trade
     * @param {object} [market] market structure
     * @returns {object} a trade structure
     */
    parseV2Trade(trade: Dict, market?: Market): Trade;
    /**
     * @ignore
     * @method
     * @name indodax#v2OrderRequest
     * @param {string} id order id
     * @param {string} symbol unified symbol
     * @param {object} params extra parameters
     * @returns {object[]} request and remaining params
     */
    v2OrderRequest(id: string, symbol: Str, params: Dict): any[];
    /**
     * @ignore
     * @method
     * @name indodax#orderV2
     * @param {string} id order id
     * @param {string} symbol unified symbol
     * @param {object} [params] extra parameters
     * @returns {object} an order structure
     */
    orderV2(id: string, symbol?: Str, params?: Dict): Promise<Order>;
    /**
     * @ignore
     * @method
     * @name indodax#openOrdersV2
     * @param {string} [symbol] unified symbol
     * @param {int} [since] earliest timestamp
     * @param {int} [limit] max number of orders
     * @param {object} [params] extra parameters
     * @returns {object[]} a list of order structures
     */
    openOrdersV2(symbol?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Order[]>;
    /**
     * @ignore
     * @method
     * @name indodax#clampV2Limit
     * @param {int} [limit] requested limit
     * @returns {int} limit clamped to 10-1000
     */
    clampV2Limit(limit?: Int): Int;
    /**
     * @ignore
     * @method
     * @name indodax#historyV2
     * @param {string} historyKind orders or trades
     * @param {string} symbol unified symbol
     * @param {int} [since] earliest timestamp
     * @param {int} [until] latest timestamp
     * @param {int} [limit] max rows per request
     * @param {object} [params] extra parameters
     * @returns {object[]} raw rows
     */
    historyV2(historyKind: string, symbol: string, since?: Int, until?: Int, limit?: Int, params?: Dict): Promise<any[]>;
    /**
     * @method
     * @name indodax#fetchOrders
     * @description fetches information on multiple orders made by the user
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#order-history
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch orders for
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/?id=order-structure}
     */
    fetchOrders(symbol?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Order[]>;
    /**
     * @method
     * @name indodax#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#trade-history
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch trades for
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/?id=trade-structure}
     */
    fetchMyTrades(symbol?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Trade[]>;
    /**
     * @ignore
     * @method
     * @name indodax#placeOrderV2
     * @param {string} symbol unified symbol
     * @param {string} orderType market or limit
     * @param {string} side buy or sell
     * @param {float} amount base amount
     * @param {float} [price] price
     * @param {object} [params] extra parameters
     * @returns {object} an order structure
     */
    placeOrderV2(symbol: string, orderType: OrderType, side: OrderSide, amount: number, price?: Num, params?: Dict): Promise<Order>;
    /**
     * @ignore
     * @method
     * @name indodax#removeOrderV2
     * @param {string} id order id
     * @param {string} symbol unified symbol
     * @param {object} [params] extra parameters
     * @returns {object} an order structure
     */
    removeOrderV2(id: string, symbol?: Str, params?: Dict): Promise<Order>;
    /**
     * @ignore
     * @method
     * @name indodax#v2CurrencyCodes
     * @param {string[]} [codes] unified currency codes
     * @returns {string[]} codes to query
     */
    v2CurrencyCodes(codes?: Strings): string[];
    /**
     * @ignore
     * @method
     * @name indodax#depositAddressesV2
     * @param {string[]} [codes] unified currency codes
     * @param {object} [params] extra parameters
     * @returns {object} a dictionary of address structures
     */
    depositAddressesV2(codes?: Strings, params?: Dict): Promise<DepositAddress[]>;
    /**
     * @ignore
     * @method
     * @name indodax#windowV2
     * @param {int} [since] earliest timestamp
     * @param {int} [until] latest timestamp
     * @param {int} maxSpan maximum window in ms
     * @returns {int[][]} windows of start and end
     */
    windowV2(since: Int, until: Int, maxSpan: number): any[];
    /**
     * @ignore
     * @method
     * @name indodax#capitalHistoryV2
     * @param {string} direction deposit or withdraw
     * @param {string} [code] unified currency code
     * @param {int} [since] earliest timestamp
     * @param {int} [until] latest timestamp
     * @param {int} [limit] max rows
     * @param {object} [params] extra parameters
     * @returns {object[]} raw rows
     */
    capitalHistoryV2(direction: string, code?: Str, since?: Int, until?: Int, limit?: Int, params?: Dict): Promise<any[]>;
    /**
     * @ignore
     * @method
     * @name indodax#fiatHistoryV2
     * @param {string} direction deposit or withdraw
     * @param {string} [code] unified currency code
     * @param {int} [since] earliest timestamp
     * @param {int} [until] latest timestamp
     * @param {int} [limit] max rows
     * @param {object} [params] extra parameters
     * @returns {object[]} raw rows
     */
    fiatHistoryV2(direction: string, code?: Str, since?: Int, until?: Int, limit?: Int, params?: Dict): Promise<any[]>;
    /**
     * @method
     * @name indodax#fetchDeposits
     * @description fetch all deposits made to an account
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-deposit-coin-information-history
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-withdrawdeposit-fiat-information-history
     * @param {string} [code] unified currency code
     * @param {int} [since] the earliest time in ms to fetch deposits for
     * @param {int} [limit] the maximum number of deposits structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch deposits for
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/?id=transaction-structure}
     */
    fetchDeposits(code?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Transaction[]>;
    /**
     * @method
     * @name indodax#fetchWithdrawals
     * @description fetch all withdrawals made from an account
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-withdraw-coin-information-history
     * @see https://github.com/btcid/indodax-official-api-docs/blob/master/INDODAX-TradeAPI-2.md#get-withdrawdeposit-fiat-information-history
     * @param {string} [code] unified currency code
     * @param {int} [since] the earliest time in ms to fetch withdrawals for
     * @param {int} [limit] the maximum number of withdrawals structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch withdrawals for
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/?id=transaction-structure}
     */
    fetchWithdrawals(code?: Str, since?: Int, limit?: Int, params?: Dict): Promise<Transaction[]>;
    /**
     * @ignore
     * @method
     * @name indodax#parseV2Transaction
     * @param {object} transaction raw transaction
     * @param {object} [currency] currency structure
     * @returns {object} a transaction structure
     */
    parseV2Transaction(transaction: Dict, currency?: Currency): Transaction;
    /**
     * @ignore
     * @method
     * @name indodax#sendWithdrawV2
     * @param {string} code unified currency code
     * @param {float} amount amount to withdraw
     * @param {string} address destination address or bank account number
     * @param {string} [tag] unused on TAPI v2
     * @param {object} [params] extra parameters
     * @returns {object} a transaction structure
     */
    sendWithdrawV2(code: string, amount: number, address: string, tag?: Str, params?: Dict): Promise<Transaction>;
    /**
     * @ignore
     * @method
     * @name indodax#sign
     * @description sign an api request; when options.sandboxUrl is set, v2 requests use that base host with no trailing path
     * @param {string} path endpoint path
     * @param {string} [api] api section, public, private, or v2
     * @param {string} [method] http method
     * @param {object} [params] request parameters
     * @param {object} [headers] request headers
     * @param {string} [body] request body
     * @returns {object} a signed request with url, method, body, and headers
     */
    sign(path: any, api?: string, method?: string, params?: Dict, headers?: NullableDict, body?: Str): Dict;
    handleErrors(code: int, reason: string, url: string, method: string, headers: Dict, body: string, response: any, requestHeaders: any, requestBody: any): undefined;
}
