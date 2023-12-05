from re import A
from fastapi import FastAPI
import mysql.connector
from fpdf import FPDF
from fastapi.responses import FileResponse
import os
import zipfile

# Connect to MySQL database
cnx = mysql.connector.connect(
    user="root", password="831842", host="193.123.127.248", database="stgcopy"
)

# Create a cursor object to execute queries
cursor = cnx.cursor()

# Initialize FastAPI
app = FastAPI()


class PDF(FPDF):
    def __init__(self, nome_aluno, notas):
        super().__init__()
        self.nome_aluno = nome_aluno
        self.notas = notas

    def header(self):
        # Posição e tamanho do logotipo
        self.image("logo.png", 40, 10, 33)

        # Posicionar o cursor para o texto à direita do logotipo
        self.set_xy(75, 10)  # Ajuste estas coordenadas conforme necessário

        # Adicionar o texto ao lado do logotipo
        self.set_font("Arial", "B", 12)
        self.cell(0, 6, "Seminário Teológico de Guarulhos", 0, 1, "L")
        self.set_xy(75, 15)  # Ajuste estas coordenadas conforme necessário
        self.set_font("Arial", "", 10)

        self.cell(0, 6, "Rua Itaverava, 445 - Macedo, Guarulhos - SP", 0, 1, "L")
        self.set_xy(90, 20)  # Ajuste estas coordenadas conforme necessário

        self.cell(0, 6, "CNPJ:04.273.604/0001-62", 0, 1, "L")
        self.set_xy(94, 25)  # Ajuste estas coordenadas conforme necessário

        self.cell(0, 6, "Tel: (11) 2408-8819", 0, 1, "L")

        # Espaço após o cabeçalho
        self.ln(7)
        self.set_font("Arial", "B", 16)
        self.cell(0, 10, f"Boletim de {self.nome_aluno}", 0, 1, "C")
        self.ln(7)

    def table_header(self):
        # Define as larguras das colunas
        column_widths = [72, 40, 40, 40]  # Ajuste esses valores conforme necessário

        self.set_fill_color(172, 193, 4)  # Cor de fundo da célula
        self.set_text_color(0)  # Cor do texto
        self.set_draw_color(0, 0, 0)  # Cor das bordas
        self.set_line_width(0.3)
        self.set_font("Arial", "B", 12)

        headers = ["Matéria", "Nota", "Faltas", "Cursou"]
        for i in range(4):
            self.cell(column_widths[i], 10, headers[i], 1, 0, "C", 1)
        self.ln()

    def table_rows(self):
        # Mesmas larguras das colunas usadas no cabeçalho
        column_widths = [72, 40, 40, 40]

        self.set_fill_color(255, 255, 255)
        self.set_text_color(0)
        # ... código para adicionar linhas ...
        for row in self.notas:
            self.set_font("Arial", "", 11)
            self.cell(column_widths[0], 10, str(row[0]), "LR", 0, "L", 1)
            for i in range(1, 4):
                self.cell(column_widths[i], 10, str(row[i]), "LR", 0, "C", 1)
            self.ln()
        self.cell(sum(column_widths), 0, "", "T")


# Refactored function to convert HTML to PDF.
def createPdf(nome, notas, cod, todos: bool):
    pdf = PDF(nome_aluno=nome, notas=notas)

    # Set document title
    pdf.set_title("Boletim do Aluno")

    # Add a page
    pdf.add_page()

    pdf.ln(4)

    # Print the table with headers and rows
    pdf.table_header()
    pdf.table_rows()
    
    # Save the PDF to a file
    if todos:
        pdf.output(f"Boletim_{nome}.pdf")
    else:
        pdf.output(f"Boletim_{cod}.pdf")

# Refactored route handler to fetch data from the database and return a modified list of tuples.
@app.get("/criarPdf")
async def criarPdf(cod):
    # MySQL query to fetch data from the database
    cursor.execute("SELECT nome FROM alunos WHERE cod_alu=" + str(cod))
    nome = cursor.fetchall()[0][0]
    sql = "SELECT materias.NOME, alunota.nota, alunota.falta, alunota.cursou FROM alunota JOIN materias ON alunota.cod_mat = materias.cod_mat WHERE cod_alu = %s ORDER BY materias.NOME"
    cursor.execute(sql, (str(cod),))
    # Fetch all rows from the query result
    rows = cursor.fetchall()

    # Modify the fetched data and store it in a_modified list

    a_modified = [(str(row[0]).strip(), row[1], row[2], row[3]) for row in rows]
    createPdf(nome, notas=a_modified, cod=cod, todos=False)
    headers = {"Content-Disposition": f"inline; filename=Boletim_{cod}.pdf"}

    # Create a FileResponse object with the file path, media type and headers
    response = FileResponse(
        f"Boletim_{cod}.pdf", media_type="application/pdf", headers=headers
    )

    return response

@app.get("/criartodos")
def aa():
    lista = [3160, 1093, 3074, 3164, 1460, 3122, 79, 3206, 1459, 3134, 3199, 3146, 3168, 3174, 3152, 3216, 3112, 3207, 3045, 3172, 3083, 3147, 3198, 3135, 2505, 3214, 3161, 3170, 3173, 193]
    for cod in lista:
        cursor.execute("SELECT nome FROM alunos WHERE cod_alu=" + str(cod))
        nome = cursor.fetchall()[0][0]
        sql = "SELECT materias.NOME, alunota.nota, alunota.falta, alunota.cursou FROM alunota JOIN materias ON alunota.cod_mat = materias.cod_mat WHERE cod_alu = %s ORDER BY materias.NOME"
        cursor.execute(sql, (str(cod),))
        # Fetch all rows from the query result
        rows = cursor.fetchall()
        # Modify the fetched data and store it in a_modified list
        a_modified = [(str(row[0]).strip(), row[1], row[2], row[3]) for row in rows]
        createPdf(nome, a_modified, cod, todos=True)
    file_start_pattern = "Boletim_"
    output_zip_file = "boletim_files.zip"
    directory = '/home/ubuntu/projetoGi/backendPythonPdf'
    with zipfile.ZipFile(output_zip_file, 'w') as zipf:
        # Iterate over all the files in directory
        for foldername, subfolders, filenames in os.walk(directory):
            for filename in filenames:
                # Check if the file starts with the desired pattern
                if filename.startswith(file_start_pattern):
                    # Create complete filepath of file in directory
                    filepath = os.path.join(foldername, filename)
                    # Add file to zip
                    zipf.write(filepath, os.path.relpath(filepath, directory))
                    os.remove(filepath)

    headers = {"Content-Disposition": f"inline; filename=boletim_files.zip"}

    # Create a FileResponse object with the file path, media type and headers
    response = FileResponse(
        f"boletim_files.zip", media_type="application/zip", headers=headers
    )
    return response
    
