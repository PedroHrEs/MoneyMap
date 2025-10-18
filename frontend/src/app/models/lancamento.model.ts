export interface EntidadeRelacionada {
  id: number;
  nome?: string;
}

export interface Lancamento {
  id?: number;
  descricao: string;
  parcela: string;

  dataLancamento: string;
  dataVencimento: string;
  dataBaixa: string | null;

  valorDocumento: number;


  centroCusto?: EntidadeRelacionada;
  pessoa?: EntidadeRelacionada;
  conta?: EntidadeRelacionada;

  tipoLancamento: 'CREDITO' | 'DEBITO';
  situacao: 'ABERTO' | 'BAIXADO';
}
