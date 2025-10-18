import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// 💡 RouterLink importado
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // 💡 RouterLink adicionado aqui
import { LancamentoService } from '../../services/lancamento.service';
import { Lancamento, EntidadeRelacionada } from '../../models/lancamento.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lancamento-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './lancamento-cadastro.html',
  styleUrls: ['./lancamento-cadastro.css']
})
export class LancamentoCadastro implements OnInit {

  lancamentoForm!: FormGroup;
  mensagemSucesso: string | null = null;
  mensagemErro: string | null = null;
  carregando: boolean = false;

  pessoas: EntidadeRelacionada[] = [];
  centrosCusto: EntidadeRelacionada[] = [];
  contas: EntidadeRelacionada[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lancamentoService: LancamentoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.carregarDadosAuxiliares();
  }

  initForm(): void {
    this.lancamentoForm = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      parcela: ['1/1', [Validators.required]],

      dataLancamento: [this.getCurrentDateString(), [Validators.required]],
      dataVencimento: [this.getCurrentDateString(), [Validators.required]],

      valorDocumento: [0.01, [Validators.required, Validators.min(0.01)]],

      centroCustoId: [null, [Validators.required]],
      pessoaId: [null, [Validators.required]],
      contaId: [null, [Validators.required]],

      tipoLancamento: ['DEBITO', [Validators.required]],
      situacao: ['ABERTO', [Validators.required]],
    });
  }

  getCurrentDateString(): string {
    return new Date().toISOString().substring(0, 10);
  }

  carregarDadosAuxiliares(): void {
    // Simulação de dados
    this.pessoas = [ { id: 1, nome: 'Fornecedor A' }, { id: 2, nome: 'Cliente B' } ];
    this.centrosCusto = [ { id: 101, nome: 'Marketing' }, { id: 102, nome: 'Financeiro' } ];
    this.contas = [ { id: 201, nome: 'Caixa Geral' }, { id: 202, nome: 'Banco Br' } ];

    if (this.pessoas.length > 0) {
      this.lancamentoForm.patchValue({
        pessoaId: this.pessoas[0].id,
        centroCustoId: this.centrosCusto[0].id,
        contaId: this.contas[0].id
      });
    }
  }

  salvar(): void {
    this.mensagemSucesso = null;
    this.mensagemErro = null;

    if (this.lancamentoForm.invalid) {
      this.mensagemErro = "Por favor, preencha todos os campos obrigatórios corretamente.";
      this.lancamentoForm.markAllAsTouched();
      return;
    }

    this.carregando = true;

    const formValue = this.lancamentoForm.value;

    const novoLancamento: Lancamento = {
        id: 0,
        descricao: formValue.descricao,
        parcela: formValue.parcela,
        dataLancamento: formValue.dataLancamento,
        dataVencimento: formValue.dataVencimento,
        dataBaixa: null,
        valorDocumento: formValue.valorDocumento,
        tipoLancamento: formValue.tipoLancamento,
        situacao: formValue.situacao,

        centroCusto: { id: formValue.centroCustoId },
        pessoa: { id: formValue.pessoaId },
        conta: { id: formValue.contaId }
    };

    this.lancamentoService.salvar(novoLancamento).subscribe({
      next: (lancamentoSalvo) => {
        this.mensagemSucesso = `Lançamento #${lancamentoSalvo.id} salvo com sucesso! Redirecionando...`;
        this.carregando = false;

        setTimeout(() => {
          this.router.navigate(['/lancamentos']);
        }, 2000);
      },
      error: (err) => {
        console.error('Erro ao salvar lançamento:', err);
        this.mensagemErro = `Erro ao salvar lançamento: ${err.message || 'Verifique o console.'}`;
        this.carregando = false;
      }
    });
  }
}
